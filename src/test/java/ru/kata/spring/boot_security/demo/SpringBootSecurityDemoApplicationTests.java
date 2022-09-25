package ru.kata.spring.boot_security.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
class SpringBootSecurityDemoApplicationTests {

	private RoleRepository roleRepository;

	@Autowired
	public void setRoleRepository(RoleRepository roleRepository) {
		this.roleRepository = roleRepository;
	}

	@Test
	void contextLoads() {
		//roleRepository.deleteAll();

		Role userRole = new Role("USER");
		Role adminRole = new Role("ADMIN");
		roleRepository.save(userRole);
		roleRepository.save(adminRole);

		List<Role> listRoles = roleRepository.findAll();
		System.out.println(Arrays.toString(listRoles.toArray()));

		assert listRoles.size() == 2;

		//assertThat(listRoles.size()).isEqualTo(2);
	}

	@Test
	void deleteRoles() {
		roleRepository.deleteAll();
		List<Role> listRoles = roleRepository.findAll();
		System.out.println(Arrays.toString(listRoles.toArray()));

		assert listRoles.size() == 0;
	}

	@Test
	void addAdminAccount() {
		roleRepository.deleteAll();
		List<Role> listRoles = roleRepository.findAll();
		System.out.println(Arrays.toString(listRoles.toArray()));

		assert listRoles.size() == 0;
	}

}
