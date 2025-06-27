package pkg

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/goburrow/modbus"
)

type ModbusService struct {
	ip   string
	port string
}

func NewModbusService(ip string, port string) *ModbusService {
	return &ModbusService{ip: ip, port: port}
}

func (s *ModbusService) ReadHoldingRegisters(address uint16, quantity uint16) ([]int16, error) {
	handler := modbus.NewTCPClientHandler(fmt.Sprintf("%s:%s", s.ip, s.port))
	handler.SlaveId = 1
	handler.Timeout = 5 * time.Second
	handler.IdleTimeout = 30 * time.Minute
	handler.Logger = log.New(os.Stdout, "modbus: ", log.LstdFlags)

	err := handler.Connect()
	if err != nil {
		return nil, err
	}
	defer handler.Close()

	modbusClient := modbus.NewClient(handler)
	response, err := modbusClient.ReadHoldingRegisters(address, quantity)
	if err != nil {
		return nil, err
	}

	// Convert []byte to []uint16
	registers := make([]int16, len(response)/2)
	for i := 0; i < len(response); i += 2 {
		registers[i/2] = int16(response[i])<<8 | int16(response[i+1])
	}

	return registers, nil
}
