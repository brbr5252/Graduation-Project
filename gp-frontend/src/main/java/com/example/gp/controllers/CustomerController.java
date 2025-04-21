package com.example.gp.controllers;

import com.example.gp.models.Customer;
import com.example.gp.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend requests
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    // ✅ Signup API
    @PostMapping("/signup")
    public ResponseEntity<?> registerCustomer(@RequestBody Customer customer) {
        try {
            if (customerRepository.existsByEmail(customer.getEmail())) {
                return ResponseEntity.badRequest().body("Error: Email already registered!");
            }
            customerRepository.save(customer);
            return ResponseEntity.ok("Signup successful!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Signup failed: " + e.getMessage());
        }
    }

    // ✅ Login API (Checks Email & Password)
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Customer loginRequest) {
        Optional<Customer> customer = customerRepository.findByEmail(loginRequest.getEmail());

        if (customer.isPresent() && customer.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok(customer.get()); // Send user data on success
        } else {
            return ResponseEntity.status(401).body("Invalid email or password!");
        }
    }

    // ✅ Get All Customers
    @GetMapping("/all")
    public ResponseEntity<?> getAllCustomers() {
        return ResponseEntity.ok(customerRepository.findAll());
    }
}
