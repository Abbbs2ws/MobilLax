package MobilLax.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

// JPA Entity, MySQL users Table Mapping
@Getter
@Setter
@Entity
@Table(name = "user_account")  // 테이블 이름 설정
public class UserAccount {

    @Id
    @Column(nullable = false, unique = true)  // 이메일은 유니크하며 null을 허용하지 않음
    private String email;  // 이메일로 사용자를 식별

    @Column(nullable = false)  // 이름은 null을 허용하지 않음
    private String name;  // 사용자 이름

    @Column(nullable = false)  // 비밀번호는 null을 허용하지 않음
    private String password;  // 암호화된 비밀번호

    @Column(nullable = false)  // 권한은 null을 허용하지 않음
    private String role;  // 사용자 권한 (ROLE_USER, ROLE_ADMIN 등)
}
