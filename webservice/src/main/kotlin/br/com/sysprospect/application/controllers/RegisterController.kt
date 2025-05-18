package br.com.sysprospect.application.controllers

import br.com.sysprospect.application.models.leads.LeadFormCreateModel
import br.com.sysprospect.application.models.leads.LeadViewModel
import br.com.sysprospect.domain.services.LeadService
import jakarta.transaction.Transactional
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/register")
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"]) // Allows all origins and headers
class RegisterController(private val leadService: LeadService) {

    @PostMapping
    @Transactional
    fun create(@RequestBody form: LeadFormCreateModel): LeadViewModel {
        return leadService.create(form)
    }
}