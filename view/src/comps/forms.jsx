import React from "react";
import { useForm } from "react-hook-form";
import styles from './form_styles.module.css';
import cslx from 'clsx';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const url = 'https://us-central1-async-706ad.cloudfunctions.net/api'

export const Login = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  
  const onSubmit = (data) => {  
    fetch('/login', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: {
        "email": data.email,
        "password": data.password
    }
   });};


  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={ cslx(styles.form, 'border')}>
      <div>
        <h2>Login</h2>
      </div>
      <Form.Group >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Email" ref={register({ required: true})} />
        {errors.email && <span>Email required</span>}
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" ref={register({ required: true})} />
          {errors.password && <span>Password required</span>}      
      </Form.Group>
       
      <Button variant="btn btn-outline-success" type="submit">
        Login
      </Button>

    </Form>
  );
};

export const Signup = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return(
    <Form onSubmit={handleSubmit(onSubmit)} className={ cslx(styles.form, 'border')}>
      <div>
        <h2>Sign up</h2>
      </div>
      <Form.Group >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Email" ref={register({ required: true})} />
        {errors.email && <span>Email required</span>}
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" ref={register({ required: true})} />
          {errors.password && <span>Password required</span>}      
      </Form.Group>
       
      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" name="comfirm_password" placeholder="Password" ref={register({ required: true})} />
          {errors.comfirm_password && <span>Password does not match</span>}      
      </Form.Group>

      <Button variant="btn btn-outline-success" type="submit">
        Sign up
      </Button>

    </Form>
  )
};

export const PostNewTimer = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return(
    <Form  onSubmit={handleSubmit(onSubmit)} className={ cslx(styles.form, 'border')}>
      <div>
        <h2>Create New Time</h2>
      </div>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" placeholder="Title" ref={register({ required: true})} />
      </Form.Group>

      <div className={styles.time_input_wrapper}>
        <Form.Group>
          <Form.Label>HH</Form.Label>
          <Form.Control type="num" name="hours" placeholder="hh" ref={register} className={styles.num_input}/>  
        </Form.Group>

        <Form.Group>
          <Form.Label>MM</Form.Label>
          <Form.Control type="num" name="minutes" placeholder="mm" ref={register} className={styles.num_input}/>
        </Form.Group>
        
        <Form.Group>
          <Form.Label>SS</Form.Label>
          <Form.Control type="num" name="seconds" placeholder="ss" ref={register} className={styles.num_input}/>  
        </Form.Group>
        
      </div>

      <Button variant='btn btn-outline-success' type="submit">
          Create
      </Button>
    </Form>
  ) 
}

export const UpdateTimer = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return(
    <Form  onSubmit={handleSubmit(onSubmit)} className={ cslx(styles.form, 'border')}>
      <div>
        <h2>Update Time</h2>
      </div>
    <Form.Group>
      <Form.Label>Title</Form.Label>
      <Form.Control type="text" name="title" placeholder="Title" ref={register({ required: true})} />
    </Form.Group>

    <div className={styles.time_input_wrapper}>
      <Form.Group className='styles.time_input_container'>
        <Form.Label>HH</Form.Label>
        <Form.Control type="num" name="hours" placeholder="hh" ref={register} className={styles.num_input}/>  
      </Form.Group>

      <Form.Group className='styles.time_input_container'>
        <Form.Label>MM</Form.Label>
        <Form.Control type="num" name="minutes" placeholder="mm" ref={register} className={styles.num_input}/>
      </Form.Group>
      
      <Form.Group className='styles.time_input_container'>
        <Form.Label>SS</Form.Label>
        <Form.Control type="num" name="seconds" placeholder="ss" ref={register} className={styles.num_input}/>  
      </Form.Group>
      
    </div>

    <Button variant='btn btn-outline-success' type="submit">
        Create
    </Button>
  </Form>
  ) 
}