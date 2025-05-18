package br.com.sysprospect.application.models.users

data class UserFormCreateModel(
    val name: String,
    val username: String,
    val password: String,
    val email: String
)