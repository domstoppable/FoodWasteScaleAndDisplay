EESchema Schematic File Version 4
LIBS:WeightAndMotionSensorShield-cache
EELAYER 26 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title "Weight and motion sensor shield"
Date "2019-07-11"
Rev "v1"
Comp ""
Comment1 ""
Comment2 "creativecommons.org/licenses/by/4.0/"
Comment3 "License: CC BY 4.0"
Comment4 "Author: Dominic Canare"
$EndDescr
Text Label 7850 3900 2    60   ~ 0
Vin
Text Label 7350 4000 0    60   ~ 0
A0
Text Label 7350 4100 0    60   ~ 0
A1
Text Label 7350 4200 0    60   ~ 0
A2
Text Label 7350 4300 0    60   ~ 0
A3
Text Label 7350 4400 0    60   ~ 0
A4(SDA)
Text Label 7350 4500 0    60   ~ 0
A5(SCL)
Text Label 4400 4000 0    60   ~ 0
0(Rx)
Text Label 4400 3800 0    60   ~ 0
2
Text Label 4400 3900 0    60   ~ 0
1(Tx)
Text Label 4400 3700 0    60   ~ 0
3(**)
Text Label 4400 3600 0    60   ~ 0
4
Text Label 4400 3500 0    60   ~ 0
5(**)
Text Label 4400 3400 0    60   ~ 0
6(**)
Text Label 4400 3300 0    60   ~ 0
7
Text Label 4400 2800 0    60   ~ 0
8
Text Label 4400 2700 0    60   ~ 0
9(**)
Text Label 4400 2600 0    60   ~ 0
10(**/SS)
Text Label 4400 2400 0    60   ~ 0
12(MISO)
Text Label 4400 2300 0    60   ~ 0
13(SCK)
Text Label 4400 2100 0    60   ~ 0
AREF
NoConn ~ 7750 2600
Text Label 4400 2000 0    60   ~ 0
A4(SDA)
Text Label 4400 1900 0    60   ~ 0
A5(SCL)
Text Notes 8300 2000 0    60   ~ 0
Holes
$Comp
L Connector_Generic:Conn_01x08 P1
U 1 1 56D70129
P 7950 2900
F 0 "P1" H 7950 3350 50  0000 C CNN
F 1 "Power" V 8050 2900 50  0000 C CNN
F 2 "Socket_Arduino_Uno:Socket_Strip_Arduino_1x08" V 8100 2900 20  0000 C CNN
F 3 "" H 7950 2900 50  0000 C CNN
	1    7950 2900
	1    0    0    -1  
$EndComp
$Comp
L power:+5V #PWR02
U 1 1 56D707BB
P 7750 3000
F 0 "#PWR02" H 7750 2850 50  0001 C CNN
F 1 "+5V" V 7750 3200 50  0000 C CNN
F 2 "" H 7750 3000 50  0000 C CNN
F 3 "" H 7750 3000 50  0000 C CNN
	1    7750 3000
	0    -1   -1   0   
$EndComp
$Comp
L power:GND #PWR03
U 1 1 56D70CC2
P 7650 3150
F 0 "#PWR03" H 7650 2900 50  0001 C CNN
F 1 "GND" V 7650 2950 50  0000 C CNN
F 2 "" H 7650 3150 50  0000 C CNN
F 3 "" H 7650 3150 50  0000 C CNN
	1    7650 3150
	0    1    1    0   
$EndComp
$Comp
L power:GND #PWR04
U 1 1 56D70CFF
P 5050 3050
F 0 "#PWR04" H 5050 2800 50  0001 C CNN
F 1 "GND" V 5050 2850 50  0000 C CNN
F 2 "" H 5050 3050 50  0000 C CNN
F 3 "" H 5050 3050 50  0000 C CNN
	1    5050 3050
	0    1    1    0   
$EndComp
$Comp
L Connector_Generic:Conn_01x06 P2
U 1 1 56D70DD8
P 7950 4200
F 0 "P2" H 7950 3800 50  0000 C CNN
F 1 "Analog" V 8050 4200 50  0000 C CNN
F 2 "Socket_Arduino_Uno:Socket_Strip_Arduino_1x06" V 8100 4250 20  0000 C CNN
F 3 "" H 7950 4200 50  0000 C CNN
	1    7950 4200
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x01 P5
U 1 1 56D71177
P 8250 1650
F 0 "P5" V 8350 1650 50  0000 C CNN
F 1 "CONN_01X01" V 8350 1650 50  0001 C CNN
F 2 "Socket_Arduino_Uno:Arduino_1pin" H 8171 1724 20  0000 C CNN
F 3 "" H 8250 1650 50  0000 C CNN
	1    8250 1650
	0    -1   -1   0   
$EndComp
$Comp
L Connector_Generic:Conn_01x01 P6
U 1 1 56D71274
P 8350 1650
F 0 "P6" V 8450 1650 50  0000 C CNN
F 1 "CONN_01X01" V 8450 1650 50  0001 C CNN
F 2 "Socket_Arduino_Uno:Arduino_1pin" H 8350 1650 20  0001 C CNN
F 3 "" H 8350 1650 50  0000 C CNN
	1    8350 1650
	0    -1   -1   0   
$EndComp
$Comp
L Connector_Generic:Conn_01x01 P7
U 1 1 56D712A8
P 8450 1650
F 0 "P7" V 8550 1650 50  0000 C CNN
F 1 "CONN_01X01" V 8550 1650 50  0001 C CNN
F 2 "Socket_Arduino_Uno:Arduino_1pin" V 8450 1650 20  0001 C CNN
F 3 "" H 8450 1650 50  0000 C CNN
	1    8450 1650
	0    -1   -1   0   
$EndComp
$Comp
L Connector_Generic:Conn_01x01 P8
U 1 1 56D712DB
P 8550 1650
F 0 "P8" V 8650 1650 50  0000 C CNN
F 1 "CONN_01X01" V 8650 1650 50  0001 C CNN
F 2 "Socket_Arduino_Uno:Arduino_1pin" H 8474 1572 20  0000 C CNN
F 3 "" H 8550 1650 50  0000 C CNN
	1    8550 1650
	0    -1   -1   0   
$EndComp
NoConn ~ 8250 1850
NoConn ~ 8350 1850
NoConn ~ 8450 1850
NoConn ~ 8550 1850
$Comp
L Connector_Generic:Conn_01x08 P4
U 1 1 56D7164F
P 4100 3600
F 0 "P4" H 4100 3100 50  0000 C CNN
F 1 "Digital" V 4200 3600 50  0000 C CNN
F 2 "Socket_Arduino_Uno:Socket_Strip_Arduino_1x08" V 4250 3550 20  0000 C CNN
F 3 "" H 4100 3600 50  0000 C CNN
	1    4100 3600
	-1   0    0    -1  
$EndComp
Wire Wire Line
	7750 3100 7650 3100
Wire Wire Line
	7750 3200 7650 3200
$Comp
L Connector_Generic:Conn_01x10 P3
U 1 1 56D721E0
P 4100 2300
F 0 "P3" H 4100 2850 50  0000 C CNN
F 1 "Digital" V 4200 2300 50  0000 C CNN
F 2 "Socket_Arduino_Uno:Socket_Strip_Arduino_1x10" V 4250 2300 20  0000 C CNN
F 3 "" H 4100 2300 50  0000 C CNN
	1    4100 2300
	-1   0    0    -1  
$EndComp
Wire Wire Line
	7650 3100 7650 3150
Text Notes 8050 2600 0    60   ~ 0
1
Wire Notes Line
	8650 2000 8150 2000
Wire Notes Line
	8150 2000 8150 1500
$Comp
L WeightAndMotionSensorShield-rescue:HX711_PCB-WeightAndMotionSensorShieldParts U1
U 1 1 5D26F269
P 5550 3750
F 0 "U1" H 5625 3285 50  0000 C CNN
F 1 "HX711_PCB" H 5625 3376 50  0000 C CNN
F 2 "WeightAndMotionSensor:HX711_PCB" H 5500 3550 50  0001 C CNN
F 3 "" H 5500 3550 50  0001 C CNN
	1    5550 3750
	-1   0    0    1   
$EndComp
$Comp
L power:GND #PWR05
U 1 1 5D278351
P 5100 3900
F 0 "#PWR05" H 5100 3650 50  0001 C CNN
F 1 "GND" V 5100 3700 50  0000 C CNN
F 2 "" H 5100 3900 50  0000 C CNN
F 3 "" H 5100 3900 50  0000 C CNN
	1    5100 3900
	0    1    1    0   
$EndComp
Wire Wire Line
	5850 3700 6000 3700
Wire Wire Line
	5850 3800 6000 3800
$Comp
L Connector_Generic:Conn_01x03 J1
U 1 1 5D27C8E2
P 5250 3150
F 0 "J1" H 5400 3150 50  0000 R CNN
F 1 "PIR" H 5450 3250 50  0000 R CNN
F 2 "Connector_PinSocket_2.54mm:PinSocket_1x03_P2.54mm_Horizontal" H 5250 3150 50  0001 C CNN
F 3 "~" H 5250 3150 50  0001 C CNN
	1    5250 3150
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x04 J2
U 1 1 5D27CA77
P 6200 3800
F 0 "J2" H 6279 3792 50  0000 L CNN
F 1 "CELLS" H 6279 3701 50  0000 L CNN
F 2 "Connector_PinSocket_2.54mm:PinSocket_1x04_P2.54mm_Horizontal" H 6200 3800 50  0001 C CNN
F 3 "~" H 6200 3800 50  0001 C CNN
	1    6200 3800
	1    0    0    -1  
$EndComp
$Comp
L power:+3.3V #PWR01
U 1 1 56D70538
P 7750 2900
F 0 "#PWR01" H 7750 2750 50  0001 C CNN
F 1 "+3.3V" V 7750 3150 50  0000 C CNN
F 2 "" H 7750 2900 50  0000 C CNN
F 3 "" H 7750 2900 50  0000 C CNN
	1    7750 2900
	0    -1   -1   0   
$EndComp
Wire Wire Line
	5850 3900 6000 3900
Wire Wire Line
	5850 4000 6000 4000
$Comp
L power:GND #PWR0101
U 1 1 5D36D481
P 4300 2200
F 0 "#PWR0101" H 4300 1950 50  0001 C CNN
F 1 "GND" V 4300 2000 50  0000 C CNN
F 2 "" H 4300 2200 50  0000 C CNN
F 3 "" H 4300 2200 50  0000 C CNN
	1    4300 2200
	0    -1   -1   0   
$EndComp
$Comp
L power:+5V #PWR0102
U 1 1 5D36F561
P 5050 3250
F 0 "#PWR0102" H 5050 3100 50  0001 C CNN
F 1 "+5V" V 5050 3450 50  0000 C CNN
F 2 "" H 5050 3250 50  0000 C CNN
F 3 "" H 5050 3250 50  0000 C CNN
	1    5050 3250
	0    -1   -1   0   
$EndComp
Connection ~ 7650 3150
Wire Wire Line
	7650 3150 7650 3200
$Comp
L power:+5V #PWR0103
U 1 1 5D370C56
P 5100 3600
F 0 "#PWR0103" H 5100 3450 50  0001 C CNN
F 1 "+5V" V 5100 3800 50  0000 C CNN
F 2 "" H 5100 3600 50  0000 C CNN
F 3 "" H 5100 3600 50  0000 C CNN
	1    5100 3600
	0    -1   -1   0   
$EndComp
$Comp
L Switch:SW_Push SW1
U 1 1 5D3722B4
P 7450 2800
F 0 "SW1" H 7450 3085 50  0000 C CNN
F 1 "RESET" H 7450 2994 50  0000 C CNN
F 2 "Button_Switch_THT:SW_PUSH_6mm" H 7450 3000 50  0001 C CNN
F 3 "" H 7450 3000 50  0001 C CNN
	1    7450 2800
	1    0    0    -1  
$EndComp
Wire Wire Line
	7650 2800 7750 2800
$Comp
L power:GND #PWR0104
U 1 1 5D3725A1
P 7250 2800
F 0 "#PWR0104" H 7250 2550 50  0001 C CNN
F 1 "GND" V 7250 2600 50  0000 C CNN
F 2 "" H 7250 2800 50  0000 C CNN
F 3 "" H 7250 2800 50  0000 C CNN
	1    7250 2800
	0    1    1    0   
$EndComp
$Comp
L Device:LED D1
U 1 1 5D372B26
P 5050 2500
F 0 "D1" H 5042 2245 50  0000 C CNN
F 1 "LED" H 5042 2336 50  0000 C CNN
F 2 "LED_THT:LED_D5.0mm" H 5050 2500 50  0001 C CNN
F 3 "~" H 5050 2500 50  0001 C CNN
	1    5050 2500
	-1   0    0    1   
$EndComp
$Comp
L Device:R_US R1
U 1 1 5D372C0F
P 5350 2500
F 0 "R1" V 5145 2500 50  0000 C CNN
F 1 "128" V 5236 2500 50  0000 C CNN
F 2 "Resistor_THT:R_Axial_DIN0207_L6.3mm_D2.5mm_P10.16mm_Horizontal" V 5390 2490 50  0001 C CNN
F 3 "~" H 5350 2500 50  0001 C CNN
	1    5350 2500
	0    1    1    0   
$EndComp
Wire Wire Line
	4300 2500 4900 2500
Wire Wire Line
	4300 3600 4700 3600
Wire Wire Line
	4700 3600 4700 3150
$Comp
L power:GND #PWR0105
U 1 1 5D3757BD
P 5500 2500
F 0 "#PWR0105" H 5500 2250 50  0001 C CNN
F 1 "GND" V 5500 2300 50  0000 C CNN
F 2 "" H 5500 2500 50  0000 C CNN
F 3 "" H 5500 2500 50  0000 C CNN
	1    5500 2500
	0    -1   -1   0   
$EndComp
Wire Wire Line
	4700 3150 5050 3150
$Comp
L Connector_Generic:Conn_01x03 J7
U 1 1 5D377417
P 10250 4150
F 0 "J7" H 10400 4150 50  0000 R CNN
F 1 "LR" H 10450 4250 50  0000 R CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical" H 10250 4150 50  0001 C CNN
F 3 "~" H 10250 4150 50  0001 C CNN
	1    10250 4150
	1    0    0    1   
$EndComp
$Comp
L Connector_Generic:Conn_01x03 J4
U 1 1 5D37767F
P 9350 4150
F 0 "J4" H 9500 4150 50  0000 R CNN
F 1 "LL" H 9550 4250 50  0000 R CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical" H 9350 4150 50  0001 C CNN
F 3 "~" H 9350 4150 50  0001 C CNN
	1    9350 4150
	-1   0    0    1   
$EndComp
$Comp
L Connector_Generic:Conn_01x03 J6
U 1 1 5D37798A
P 10250 3450
F 0 "J6" H 10400 3450 50  0000 R CNN
F 1 "UR" H 10450 3550 50  0000 R CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical" H 10250 3450 50  0001 C CNN
F 3 "~" H 10250 3450 50  0001 C CNN
	1    10250 3450
	1    0    0    1   
$EndComp
$Comp
L Connector_Generic:Conn_01x03 J3
U 1 1 5D377991
P 9350 3450
F 0 "J3" H 9500 3450 50  0000 R CNN
F 1 "UL" H 9550 3550 50  0000 R CNN
F 2 "Connector_PinSocket_2.54mm:PinSocket_1x03_P2.54mm_Vertical" H 9350 3450 50  0001 C CNN
F 3 "~" H 9350 3450 50  0001 C CNN
	1    9350 3450
	-1   0    0    1   
$EndComp
$Comp
L Connector_Generic:Conn_01x04 J5
U 1 1 5D379D09
P 9750 2900
F 0 "J5" H 9829 2892 50  0000 L CNN
F 1 "CELLS" H 9829 2801 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x04_P2.54mm_Vertical" H 9750 2900 50  0001 C CNN
F 3 "~" H 9750 2900 50  0001 C CNN
	1    9750 2900
	0    -1   -1   0   
$EndComp
Wire Wire Line
	9750 3450 9750 3100
Wire Wire Line
	9850 3450 9850 3100
Wire Wire Line
	9550 3450 9750 3450
Wire Wire Line
	9850 3450 10050 3450
Wire Wire Line
	9950 3750 9950 3100
Wire Wire Line
	9800 3700 9650 3700
Wire Wire Line
	9650 3700 9650 3100
Wire Wire Line
	9550 4150 9650 4150
Wire Wire Line
	9650 3750 9650 4150
Wire Wire Line
	9650 3750 9950 3750
Wire Wire Line
	9950 4150 10050 4150
Wire Wire Line
	9800 3700 9800 3800
Wire Wire Line
	9800 3800 9950 3800
Wire Wire Line
	9950 3800 9950 4150
Wire Wire Line
	9550 3350 10050 3350
Wire Wire Line
	9550 3550 9600 3550
Wire Wire Line
	9600 3550 9600 4250
Wire Wire Line
	9600 4250 9550 4250
Wire Wire Line
	10050 4250 10000 4250
Wire Wire Line
	10000 4250 10000 3550
Wire Wire Line
	10000 3550 10050 3550
Wire Wire Line
	9550 4050 10050 4050
Wire Wire Line
	4300 3700 5100 3700
Wire Wire Line
	4300 3800 5100 3800
$EndSCHEMATC
