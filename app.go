package main

import (
	"context"
	"fmt"
	"modbus/pkg"
)

// App struct
type App struct {
	ctx  context.Context
	ip   string
	port string
}

type Device struct {
	Ip   string
	Port string
}

type RegisterValue struct {
	Register uint16
	Value    int16
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetDevicesIp(ip string, port string) Device {
	// Store the values in the App struct
	a.ip = ip
	a.port = port
	return Device{Ip: ip, Port: port}
}

func (a *App) ReadHoldingRegisters(address uint16, quantity uint16) ([]int16, error) {
	// Use the stored IP and port
	modbusService := pkg.NewModbusService(a.ip, a.port)
	return modbusService.ReadHoldingRegisters(address, quantity)
}

func (a *App) ComputeFloat32(registerValues []RegisterValue) ([]pkg.ModbusReading, error) {
	var readings []pkg.ModbusReading
	if len(registerValues) < 2 {
		return readings, nil // Not enough data for a float32
	}
	for i := 0; i+1 < len(registerValues); i += 2 {
		lsr := registerValues[i].Value
		msr := registerValues[i+1].Value
		regPair :=
			fmt.Sprintf("%d/%d", registerValues[i].Register+1, registerValues[i+1].Register+1)
		val := pkg.DecodeFloat32(lsr, msr)
		readings = append(readings, pkg.ModbusReading{
			RegisterPair: regPair,
			LSR:          lsr,
			MSR:          msr,
			Value:        val,
		})
	}
	return readings, nil
}
