package br.com.sysprospect

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SysprospectApplication

fun main(args: Array<String>) {
	runApplication<SysprospectApplication>(*args)
}
