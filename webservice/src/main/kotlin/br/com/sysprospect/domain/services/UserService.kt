package br.com.sysprospect.domain.services

import br.com.sysprospect.application.mappers.users.UserFormMapper
import br.com.sysprospect.application.mappers.users.UserViewMapper
import br.com.sysprospect.application.models.users.UserFormCreateModel
import br.com.sysprospect.application.models.users.UserFormUpdateModel
import br.com.sysprospect.application.models.users.UserViewModel
import br.com.sysprospect.domain.repositories.IUserRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class UserService(
    private val userRepository: IUserRepository,
    private val userViewMapper: UserViewMapper,
    private val userFormMapper: UserFormMapper
) {

    fun create(form: UserFormCreateModel): UserViewModel{
        val user = userFormMapper.map(form)
        userRepository.save(user)
        return userViewMapper.map(user)
    }

    fun update(form: UserFormUpdateModel): UserViewModel{
        val user = userRepository.findById(form.id).orElseThrow(
                //TODO - implementar retorno nulo
        )

        user.name = form.name
        user.password = form.password
        user.email = form.email

        userRepository.save(user)

        return userViewMapper.map(user)
    }

    fun delete(id: UUID){
        val user = userRepository.findById(id).orElseThrow(
            //TODO - implementar retorno nulo
        )
        userRepository.delete(user)
    }

    fun findById(id: UUID): UserViewModel{
        val user = userRepository.findById(id).orElseThrow(
            //TODO - implementar retorno nulo
        )
        return userViewMapper.map(user)
    }

    fun list(name: String?, pageable: Pageable): Page<UserViewModel> {
        val users = if (name.isNullOrEmpty()) {
            userRepository.findAll(pageable)
        } else {
            userRepository.findByName(name, pageable)
        }
        return users.map { u -> userViewMapper.map(u)}
    }
}