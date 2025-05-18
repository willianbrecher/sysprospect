package br.com.sysprospect.application.controllers

import br.com.sysprospect.application.models.leads.LeadFormCreateModel
import br.com.sysprospect.application.models.leads.LeadFormUpdateModel
import br.com.sysprospect.application.models.leads.LeadViewModel
import br.com.sysprospect.domain.services.LeadService
import jakarta.transaction.Transactional
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"]) // Allows all origins and headers
class LeadController(
    private val leadService: LeadService
) {
    @GetMapping("/pageable-list")
    fun list(@RequestParam(required = false) name: String?,
             @PageableDefault(size = 10, sort = ["name"], direction = Sort.Direction.DESC) pageable: Pageable
    ): Page<LeadViewModel> {
        return leadService.list(name, pageable);
    }

    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): LeadViewModel {
        return leadService.findById(UUID.fromString(id))
    }

    @PostMapping
    @Transactional
    fun create(@RequestBody  form: LeadFormCreateModel): LeadViewModel {
        return leadService.create(form)
    }

    @PutMapping
    @Transactional
    fun update(@RequestBody  form: LeadFormUpdateModel): LeadViewModel {
        return leadService.update(form)
    }

    @DeleteMapping("/{id}")
    @Transactional
    fun delete(@PathVariable id: String) {
        leadService.delete(UUID.fromString(id))
    }
}