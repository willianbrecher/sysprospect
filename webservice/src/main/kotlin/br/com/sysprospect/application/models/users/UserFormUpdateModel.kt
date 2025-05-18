package br.com.sysprospect.application.models.users

import java.util.*

data class UserFormUpdateModel(
    val id: UUID,
    val name: String,
    val password: String,
    val email: String
)