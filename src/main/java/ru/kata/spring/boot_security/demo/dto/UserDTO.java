package ru.kata.spring.boot_security.demo.dto;

import lombok.Getter;
import lombok.Setter;
import ru.kata.spring.boot_security.demo.model.Role;

import java.util.Set;

@Getter
@Setter
public class UserDTO {

    private Long id;

    private String username;

    private String password;

    private String firstName;

    private String lastName;

    private Byte age;

    private String email;

    private Set<Role> roles;

}
