package com.chris.models.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.chris.models.entity.Cliente;

public interface IClienteService {
	
	public List<Cliente> findAll();
	
	public Page<Cliente> findAll(Pageable pageable); 
	
	public Cliente save(Cliente cliente);
	
	public Cliente findById(Long id);
	
	public void delete(Long id);

}


