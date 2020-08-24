import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback,
} from 'reactstrap';
import { gql, useMutation } from '@apollo/client';
import {
  CreateIncidentPayload,
  MutationCreateIncidentArgs,
} from '../../common/types';
import LocalisationSearchInput from '../LocalisationSearchInput';

interface Props {
  isOpen: boolean;
  setIsOpen: any; //TODO: typing
}

type Inputs = {
  author: string;
  message: string;
  localisation: string;
};

const CREATE_INCIDENT = gql`
  mutation CreateIncident($input: createIncidentInput) {
    createIncident(input: $input) {
      incident {
        author
        message
      }
    }
  }
`;

const EntryForm = ({ isOpen, setIsOpen }: Props) => {
  const { register, handleSubmit, errors, control, getValues } = useForm<
    Inputs
  >();
  const [createIncident, { loading, error }] = useMutation<
    CreateIncidentPayload,
    MutationCreateIncidentArgs
  >(CREATE_INCIDENT);

  const onSubmit = (data: Inputs) => {
    createIncident({
      variables: {
        input: { data: { author: data.author, message: data.message } },
      },
      refetchQueries: ['Incidents'],
    })
      .then(() => setIsOpen(false))
      .catch(err => alert(err));
  };

  return (
    <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
      <ModalHeader>Dodaj wydarzenie</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for='author'>Nick</Label>
            <Input
              name='author'
              id='author'
              disabled={loading}
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
              disabled={loading}
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
              invalid={errors.message ? true : false}
              style={{ minHeight: '200px' }}
            />
            <FormFeedback>
              <ErrorMessage errors={errors} name='message' />
            </FormFeedback>
          </FormGroup>
          <Controller
            as={props => (
              <LocalisationSearchInput props={props} errors={errors} />
            )}
            control={control}
            name='localisation'
            rules={{
              required: 'To pole jest wymagane.',
            }}
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          disabled={loading}
          color='primary'
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
        <Button color='secondary' onClick={() => setIsOpen(false)}>
          Anuluj
        </Button>
      </ModalFooter>
      {error && alert('Error')}
    </Modal>
  );
};

export default EntryForm;
