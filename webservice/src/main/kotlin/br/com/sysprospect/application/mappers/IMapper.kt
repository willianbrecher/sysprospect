package br.com.sysprospect.application.mappers

interface IMapper<T, U> {
    fun map(t: T): U
}