package br.com.sysprospect.application.controllers

import br.com.sysprospect.application.models.users.UserFormCreateModel
import br.com.sysprospect.application.models.users.UserFormUpdateModel
import br.com.sysprospect.application.models.users.UserViewModel
import br.com.sysprospect.domain.services.UserService
import jakarta.transaction.Transactional
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.web.bind.annotation.*
import java.util.UUID

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"]) // Allows all origins and headers
class UserController(
    private val userService: UserService
){
    @GetMapping("/pageable-list")
    fun list(@RequestParam(required = false) name: String?,
             @PageableDefault(size = 10, sort = ["name"], direction = Sort.Direction.DESC) pageable: Pageable
    ): Page<UserViewModel> {
        return userService.list(name, pageable);
    }

    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): UserViewModel {
        return userService.findById(UUID.fromString(id))
    }

    @PostMapping
    @Transactional
    fun create(@RequestBody  form: UserFormCreateModel): UserViewModel {
        return userService.create(form)
    }

    @PutMapping
    @Transactional
    fun update(@RequestBody  form: UserFormUpdateModel): UserViewModel {
        return userService.update(form)
    }

    @DeleteMapping("/{id}")
    @Transactional
    fun delete(@PathVariable id: String) {
        userService.delete(UUID.fromString(id))
    }
}