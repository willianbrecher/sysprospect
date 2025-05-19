package br.com.sysprospect.application.models

import java.time.LocalDateTime

data class ErrorViewModel(
    val timestamp: LocalDateTime = LocalDateTime.now(),
    val status: Int,
    val error: String,
    val message: String?,
    val path: String
)