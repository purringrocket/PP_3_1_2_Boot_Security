package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.util.Arrays;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public String index(Model model) {
        System.out.println(Arrays.toString(userService.findAll().toArray()));
        model.addAttribute("users", userService.findAll());
        return "admin/index";
    }

    @GetMapping("/{id}")
    public String profile(@PathVariable("id") Long id, Model model) {
        model.addAttribute("user", userService.findUserById(id));
        return "admin/userProfile";
    }

    @GetMapping("/newUser")
    public String newUser(@ModelAttribute("user") User user) {
        return "admin/newUser";
    }

    @PostMapping
    public String create(@ModelAttribute("user") @Valid User user) {
        userService.save(user);
        return "redirect:/admin";
    }

    @GetMapping("/{id}/edit")
    public String edit(Model model, @PathVariable("id") Long id) {
        model.addAttribute("user", userService.findUserById(id));
        return "admin/edit";
    }

    @PatchMapping("/{id}")
    public String update(@ModelAttribute("user") User user) {
           userService.update(user.getId(), user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }

}
