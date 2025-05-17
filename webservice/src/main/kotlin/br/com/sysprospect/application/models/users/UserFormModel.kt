package br.com.sysprospect.application.models.users

data class UserFormModel(
    val name: String,
    val username: String,
    val password: String,
    val email: String
)