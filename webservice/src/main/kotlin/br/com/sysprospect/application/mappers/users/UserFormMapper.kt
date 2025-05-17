package br.com.sysprospect.application.mappers.users

import br.com.sysprospect.application.mappers.IMapper
import br.com.sysprospect.application.models.users.UserFormModel
import br.com.sysprospect.domain.entities.UserEntity
import org.springframework.stereotype.Component

@Component
class UserFormMapper: IMapper<UserFormModel, UserEntity> {
    override fun map(t: UserFormModel): UserEntity {
        TODO("Not yet implemented")
    }
}