import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { ErrorMessage } from '@hookform/error-message';

type Inputs = {
  author: string;
  message: string;
};

export const EntryForm = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(data: Inputs) {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/entries`, {
      method: 'POST',
      body: JSON.stringify({
        author: data.author,
        message: data.message,
      }),
    })
      .then(res => {
        if (res.ok) {
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      {isLoading ? (
        <Spinner color='primary' />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for='author'>Nick</Label>
            <Input
              name='author'
              id='author'
              innerRef={register({
                maxLength: {
                  value: 50,
                  message: 'Maksymalna liczba znaków wynosi 250.',
                },
              })}
            />
          </FormGroup>
          <FormGroup>
            <Label for='message'>Wiadomość</Label>
            <Input
              type='textarea'
              name='message'
              id='message'
              innerRef={register({
                required: 'To pole jest wymagane.',
                minLength: {
                  value: 10,
                  message: 'Minimalna ilość znaków dla tego pola wynosi 10.',
                },
                maxLength: {
                  value: 250,
                  message: 'Maksymalna liczba znaków wynosi 250.',
                },
              })}
            />
            <ErrorMessage errors={errors} name='message' />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      )}
    </div>
  );
};