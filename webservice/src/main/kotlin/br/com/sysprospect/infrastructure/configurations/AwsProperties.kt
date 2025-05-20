package br.com.sysprospect.infrastructure.configurations

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration


@Configuration
@ConfigurationProperties(prefix = "aws")
class AwsProperties {
    var enabled: Boolean = false
    lateinit var accessKey: String
    lateinit var secretKey: String
    lateinit var region: String
    lateinit var endPoint: String
    lateinit var snsTopic: String
}