package br.com.sysprospect.application.controllers

import br.com.sysprospect.domain.services.LeadService
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(name = "/api/leads")
class LeadController(
    private val leadService: LeadService
) {
}