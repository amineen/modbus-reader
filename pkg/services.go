package pkg

import (
	"encoding/binary"
	"math"
)

type ModbusReading struct {
	Register string  `json:"register"`
	LSR      int16   `json:"LSR"`
	MSR      int16   `json:"MSR"`
	Value    float32 `json:"value"`
}

func DecodeFloat32(lsr int16, msr int16) float32 {
	// Use uint16 to pack bytes
	buf := make([]byte, 4)
	binary.LittleEndian.PutUint16(buf[0:], uint16(lsr))
	binary.LittleEndian.PutUint16(buf[2:], uint16(msr))
	bits := binary.LittleEndian.Uint32(buf)
	return math.Float32frombits(bits)
}
