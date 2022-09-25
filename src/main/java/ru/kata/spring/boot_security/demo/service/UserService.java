package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> findAll();

    User findUserById(Long id);

    void save(User user);

    void update(Long id, User user);

    void delete(Long id);

    void register(User user);
}
