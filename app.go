package main

import (
	"context"
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

func (a *App) ReadHoldingRegisters(address uint16, quantity uint16) ([]uint16, error) {
	// Use the stored IP and port
	modbusService := pkg.NewModbusService(a.ip, a.port)
	return modbusService.ReadHoldingRegisters(address, quantity)
}
