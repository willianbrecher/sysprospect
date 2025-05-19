package br.com.sysprospect.infrastructure.jpa

import org.hibernate.boot.model.FunctionContributions
import org.hibernate.dialect.PostgreSQLDialect
import org.hibernate.dialect.function.StandardSQLFunction
import org.hibernate.type.StandardBasicTypes

class CustomPostgreSQLDialect : PostgreSQLDialect() {
    override fun initializeFunctionRegistry(functionContributions: FunctionContributions) {
        super.initializeFunctionRegistry(functionContributions)
        functionContributions.functionRegistry.register(
            "application.filter", StandardSQLFunction("application.filter", StandardBasicTypes.BOOLEAN)
        )
    }
}