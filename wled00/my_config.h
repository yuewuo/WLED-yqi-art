#pragma once

/*
 * Welcome!
 * You can use the file "my_config.h" to make changes to the way WLED is compiled!
 * It is possible to enable and disable certain features as well as set defaults for some runtime changeable settings.
 *
 * How to use:
 * PlatformIO: Just compile the unmodified code once! The file "my_config.h" will be generated automatically and now you can make your changes.
 *
 * ArduinoIDE: Make a copy of this file and name it "my_config.h". Go to wled.h and uncomment "#define WLED_USE_MY_CONFIG" in the top of the file.
 *
 * DO NOT make changes to the "my_config_sample.h" file directly! Your changes will not be applied.
 */

// uncomment to force the compiler to show a warning to confirm that this file is included
//#warning **** my_config.h: Settings from this file are honored ****

//WARNING: this will hardcode these as the default even after a factory reset
#define CLIENT_SSID "YQI-Art-AP"
#define CLIENT_PASS "yqiart20230617"

//#define MAX_LEDS 1500       //Maximum total LEDs. More than 1500 might create a low memory situation on ESP8266.

#ifndef HC_SR04_TRIG_PIN
#define HC_SR04_TRIG_PIN 4  // D2 (GPIO4) on Wemod D1 mini compatible boards
#endif

#ifndef HC_SR04_ECHO_PIN
#define HC_SR04_ECHO_PIN 5  // D1 (GPIO5) on Wemod D1 mini compatible boards
#endif
