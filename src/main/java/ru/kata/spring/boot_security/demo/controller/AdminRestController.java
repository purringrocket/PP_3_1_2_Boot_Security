package ru.kata.spring.boot_security.demo.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminRestController {

    private final ModelMapper modelMapper;
    private final UserService userService;

    @Autowired
    public AdminRestController(ModelMapper modelMapper, UserService userService) {
        this.modelMapper = modelMapper;
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return new ResponseEntity<>(userService.findAll().stream().map(user -> modelMapper.map(user, UserDTO.class)).collect(Collectors.toList()), HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<HttpStatus> addUser(@RequestBody UserDTO userDTO) {
        userService.save(modelMapper.map(userDTO, User.class));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PatchMapping("/users/")
    public ResponseEntity<HttpStatus> updateUser(@RequestBody UserDTO userDTO) {
        userService.update(userDTO.getId(), modelMapper.map(userDTO, User.class));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable("id") Long id) {
        return new ResponseEntity<>(modelMapper.map(userService.findUserById(id), UserDTO.class), HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Long id) {
        userService.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}