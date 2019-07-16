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
Text Label 7300 3400 2    60   ~ 0
Vin
Text Label 6800 3500 0    60   ~ 0
A0
Text Label 6800 3600 0    60   ~ 0
A1
Text Label 6800 3700 0    60   ~ 0
A2
Text Label 6800 3800 0    60   ~ 0
A3
Text Label 6800 3900 0    60   ~ 0
A4(SDA)
Text Label 6800 4000 0    60   ~ 0
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
Text Label 4400 3100 0    60   ~ 0
8
Text Label 4400 3000 0    60   ~ 0
9(**)
Text Label 4400 2900 0    60   ~ 0
10(**/SS)
Text Label 4400 2800 0    60   ~ 0
11(**/MOSI)
Text Label 4400 2700 0    60   ~ 0
12(MISO)
Text Label 4400 2600 0    60   ~ 0
13(SCK)
Text Label 4400 2400 0    60   ~ 0
AREF
NoConn ~ 7200 2600
Text Label 4400 2300 0    60   ~ 0
A4(SDA)
Text Label 4400 2200 0    60   ~ 0
A5(SCL)
Text Notes 8300 2000 0    60   ~ 0
Holes
$Comp
L Connector_Generic:Conn_01x08 P1
U 1 1 56D70129
P 7400 2900
F 0 "P1" H 7400 3350 50  0000 C CNN
F 1 "Power" V 7500 2900 50  0000 C CNN
F 2 "Socket_Arduino_Uno:Socket_Strip_Arduino_1x08" V 7550 2900 20  0000 C CNN
F 3 "" H 7400 2900 50  0000 C CNN
	1    7400 2900
	1    0    0    -1  
$EndComp
Text Label 6450 2800 0    60   ~ 0
Reset
$Comp
L power:+5V #PWR02
U 1 1 56D707BB
P 6950 3000
F 0 "#PWR02" H 6950 2850 50  0001 C CNN
F 1 "+5V" V 6950 3200 50  0000 C CNN
F 2 "" H 6950 3000 50  0000 C CNN
F 3 "" H 6950 3000 50  0000 C CNN
	1    6950 3000
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR03
U 1 1 56D70CC2
P 7100 3200
F 0 "#PWR03" H 7100 2950 50  0001 C CNN
F 1 "GND" H 7100 3100 50  0000 C CNN
F 2 "" H 7100 3200 50  0000 C CNN
F 3 "" H 7100 3200 50  0000 C CNN
	1    7100 3200
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR04
U 1 1 56D70CFF
P 5100 2500
F 0 "#PWR04" H 5100 2250 50  0001 C CNN
F 1 "GND" H 5100 2350 50  0000 C CNN
F 2 "" H 5100 2500 50  0000 C CNN
F 3 "" H 5100 2500 50  0000 C CNN
	1    5100 2500
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x06 P2
U 1 1 56D70DD8
P 7400 3700
F 0 "P2" H 7400 3300 50  0000 C CNN
F 1 "Analog" V 7500 3700 50  0000 C CNN
F 2 "Socket_Arduino_Uno:Socket_Strip_Arduino_1x06" V 7550 3750 20  0000 C CNN
F 3 "" H 7400 3700 50  0000 C CNN
	1    7400 3700
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
	7200 2900 7050 2900
Wire Wire Line
	7200 3000 6950 3000
Wire Wire Line
	7200 3100 7100 3100
Wire Wire Line
	7200 3200 7100 3200
Connection ~ 7100 3200
$Comp
L Connector_Generic:Conn_01x10 P3
U 1 1 56D721E0
P 4100 2600
F 0 "P3" H 4100 3150 50  0000 C CNN
F 1 "Digital" V 4200 2600 50  0000 C CNN
F 2 "Socket_Arduino_Uno:Socket_Strip_Arduino_1x10" V 4250 2600 20  0000 C CNN
F 3 "" H 4100 2600 50  0000 C CNN
	1    4100 2600
	-1   0    0    -1  
$EndComp
Wire Wire Line
	7100 3100 7100 3200
Wire Wire Line
	7100 3200 7100 3250
Text Notes 7500 2600 0    60   ~ 0
1
Wire Notes Line
	8650 2000 8150 2000
Wire Notes Line
	8150 2000 8150 1500
$Comp
L WeightAndMotionSensorShieldParts:HX711_PCB U1
U 1 1 5D26F269
P 5750 3750
F 0 "U1" H 5825 3285 50  0000 C CNN
F 1 "HX711_PCB" H 5825 3376 50  0000 C CNN
F 2 "WeightAndMotionSensor:HX711_PCB" H 5700 3550 50  0001 C CNN
F 3 "" H 5700 3550 50  0001 C CNN
	1    5750 3750
	-1   0    0    1   
$EndComp
$Comp
L power:GND #PWR05
U 1 1 5D278351
P 5300 3900
F 0 "#PWR05" H 5300 3650 50  0001 C CNN
F 1 "GND" H 5300 3750 50  0000 C CNN
F 2 "" H 5300 3900 50  0000 C CNN
F 3 "" H 5300 3900 50  0000 C CNN
	1    5300 3900
	1    0    0    -1  
$EndComp
Wire Wire Line
	4300 2500 5100 2500
Wire Wire Line
	5300 3600 5300 3000
Wire Wire Line
	5300 3000 6800 3000
Connection ~ 6950 3000
Wire Wire Line
	6050 3700 6200 3700
Wire Wire Line
	6050 3800 6200 3800
$Comp
L Connector_Generic:Conn_01x03 J1
U 1 1 5D27C8E2
P 5900 2300
F 0 "J1" V 5866 2112 50  0000 R CNN
F 1 "PIR" V 5775 2112 50  0000 R CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x03_P2.54mm_Vertical" H 5900 2300 50  0001 C CNN
F 3 "~" H 5900 2300 50  0001 C CNN
	1    5900 2300
	0    -1   -1   0   
$EndComp
$Comp
L Connector_Generic:Conn_01x04 J2
U 1 1 5D27CA77
P 6400 3800
F 0 "J2" H 6479 3792 50  0000 L CNN
F 1 "CELLS" H 6479 3701 50  0000 L CNN
F 2 "Connector_PinHeader_2.54mm:PinHeader_1x04_P2.54mm_Vertical" H 6400 3800 50  0001 C CNN
F 3 "~" H 6400 3800 50  0001 C CNN
	1    6400 3800
	1    0    0    -1  
$EndComp
Wire Wire Line
	4300 3600 5100 3600
Wire Wire Line
	5100 3600 5100 2900
Wire Wire Line
	5100 2900 5900 2900
Wire Wire Line
	5900 2500 5900 2900
Wire Wire Line
	5100 2500 5800 2500
Connection ~ 5100 2500
Wire Wire Line
	6000 2500 6800 2500
Wire Wire Line
	6800 2500 6800 3000
Connection ~ 6800 3000
Wire Wire Line
	6800 3000 6950 3000
$Comp
L power:+3.3V #PWR01
U 1 1 56D70538
P 7050 2900
F 0 "#PWR01" H 7050 2750 50  0001 C CNN
F 1 "+3.3V" V 7050 3150 50  0000 C CNN
F 2 "" H 7050 2900 50  0000 C CNN
F 3 "" H 7050 2900 50  0000 C CNN
	1    7050 2900
	1    0    0    -1  
$EndComp
Wire Wire Line
	6050 3900 6200 3900
Wire Wire Line
	6050 4000 6200 4000
Wire Wire Line
	4300 3700 4700 3700
Wire Wire Line
	4750 3800 4300 3800
Wire Wire Line
	5250 3800 5300 3800
Wire Wire Line
	5250 3750 5250 3800
Wire Wire Line
	4700 3700 4700 3750
Wire Wire Line
	4750 3700 4750 3800
Wire Wire Line
	4700 3750 5250 3750
Wire Wire Line
	5300 3700 4750 3700
$EndSCHEMATC
