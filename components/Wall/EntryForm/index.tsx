import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

type Inputs = {
  author: string;
  message: string;
};

export const EntryForm = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>();

  async function onSubmit(data: Inputs) {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entries`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     author: data.author,
    //     message: data.message,
    //   }),
    // });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label for='author'>Nick</Label>
        <Input name='author' id='author' ref={register} />
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
  );
};
