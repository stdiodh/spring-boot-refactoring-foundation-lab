package com.andi.rest_crud.service

import com.andi.rest_crud.domain.PostEntity
import com.andi.rest_crud.dto.PostCreateRequest
import com.andi.rest_crud.dto.PostResponse
import com.andi.rest_crud.dto.PostUpdateRequest
import com.andi.rest_crud.exception.ForbiddenPostAccessException
import com.andi.rest_crud.exception.PostNotFoundException
import com.andi.rest_crud.repository.PostRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class PostService(
    private val postRepository: PostRepository
) {

    @Transactional
    fun create(request: PostCreateRequest, authorEmail: String): PostResponse {
        // TODO 1. create에서 검증, 엔티티 생성, 저장, 응답 변환이 한 번에 섞여 있는지 확인하세요.
        // TODO 2. DTO 검증 외에 서비스가 한 번 더 방어해야 할 값이 있는지도 생각해보세요.
        val savedPost = postRepository.save(
            PostEntity(
                title = request.title,
                content = request.content,
                author = authorEmail
            )
        )

        return PostResponse.from(savedPost)
    }

    fun getAll(): List<PostResponse> {
        return postRepository.findAll()
            .map(PostResponse::from)
    }

    fun getById(id: Long): PostResponse {
        return PostResponse.from(findPostById(id))
    }

    @Transactional
    fun update(id: Long, request: PostUpdateRequest, currentUserEmail: String): PostResponse {
        // TODO 3. update에서도 같은 방식으로 책임을 나눌 수 있는지 보세요.
        // TODO 4. 수정 요청값을 정리(trim)하거나 검증하는 흐름을 helper로 분리해도 좋습니다.
        val post = findPostById(id)
        validateAuthor(post, currentUserEmail)
        post.update(request.title, request.content)

        return PostResponse.from(post)
    }

    @Transactional
    fun delete(id: Long, currentUserEmail: String) {
        val post = findPostById(id)
        validateAuthor(post, currentUserEmail)
        postRepository.delete(post)
    }

    private fun findPostById(id: Long): PostEntity {
        // TODO 5. 현재 서비스가 찾기 실패만 다루는지, 요청값 자체가 잘못된 경우도 다뤄야 하는지 같이 보세요.
        return postRepository.findById(id)
            .orElseThrow { PostNotFoundException(id) }
    }

    private fun validateAuthor(post: PostEntity, currentUserEmail: String) {
        if (!post.isWrittenBy(currentUserEmail)) {
            throw ForbiddenPostAccessException(post.id)
        }
    }
}
