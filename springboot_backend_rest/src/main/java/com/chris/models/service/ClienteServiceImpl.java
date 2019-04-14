package com.chris.models.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.codec.ClientCodecConfigurer.ClientDefaultCodecs;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chris.models.dao.IClienteDao;
import com.chris.models.entity.Cliente;


@Service
public class ClienteServiceImpl implements IClienteService {
	
	@Autowired
	private IClienteDao clienteFDao;

	@Override
	@Transactional(readOnly = true)
	public List<Cliente> findAll() {		 
		
		return (List<Cliente>) clienteFDao.findAll();
	}

	@Override
	@Transactional
	public Cliente save(Cliente cliente) {
		
		return clienteFDao.save(cliente);
	}

	@Override
	@Transactional(readOnly = true)
	public Cliente findById(Long id) {
		
		return clienteFDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		clienteFDao.deleteById(id);		
	}
	
}


