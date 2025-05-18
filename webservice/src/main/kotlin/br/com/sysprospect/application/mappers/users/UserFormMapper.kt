package br.com.sysprospect.application.mappers.users

import br.com.sysprospect.application.mappers.IMapper
import br.com.sysprospect.application.models.users.UserFormCreateModel
import br.com.sysprospect.application.models.users.UserFormUpdateModel
import br.com.sysprospect.domain.entities.UserEntity
import org.springframework.stereotype.Component

@Component
class UserFormMapper: IMapper<UserFormCreateModel, UserEntity> {
    override fun map(t: UserFormCreateModel): UserEntity {
        return UserEntity(
            name = t.name,
            email = t.email,
            username = t.username,
            password = t.password
        )
    }
}