package br.com.sysprospect.application.controllers

import br.com.sysprospect.application.models.users.UserFormModel
import br.com.sysprospect.application.models.users.UserViewModel
import br.com.sysprospect.domain.services.UserService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping(name = "/api/users")
class UserController(
    private val userService: UserService
){
    @GetMapping
    fun list(@RequestParam(required = false) name: String?,
             @PageableDefault(size = 10, sort = ["name"], direction = Sort.Direction.DESC) pageable: Pageable
    ): Page<UserViewModel> {
        return userService.list(name, pageable);
    }

    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): UserViewModel {
        return userService.findById(UUID.fromString(id))
    }

    fun create(@RequestParam form: UserFormModel): UserViewModel {
        return userService.create(form)
    }
}