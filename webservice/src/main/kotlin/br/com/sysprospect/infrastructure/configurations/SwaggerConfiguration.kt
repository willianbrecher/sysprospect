package br.com.sysprospect.infrastructure.configurations

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

//@SecurityScheme(
//    name = "bearerAuth",
//    type = SecuritySchemeType.HTTP,
//    bearerFormat = "JWT",
//    scheme = "bearer"
//)
@Configuration
class SwaggerConfig {

    @Bean
    fun customOpenAPI(): OpenAPI {
        return OpenAPI()
            .info(
                Info()
                    .title("SysProspect API")
                    .version("1.0.0")
                    .description("Documentation")
            )
    }
}