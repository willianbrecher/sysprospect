package br.com.sysprospect.infrastructure.configurations

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class SecurityConfiguration {

//    @Bean
//    fun filterChain(http: HttpSecurity): SecurityFilterChain {
//        http
//            .cors { it.disable() } // Disables CORS
//            // Other security configurations
//            .authorizeHttpRequests { auth -> auth.anyRequest().permitAll() }
//        return http.build()
//    }
}