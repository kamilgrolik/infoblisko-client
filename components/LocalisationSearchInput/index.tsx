import React, { PropsWithChildren } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
} from 'react-places-autocomplete';
import { ErrorMessage } from '@hookform/error-message';
import { FormFeedback, FormGroup, Label, ListGroup } from 'reactstrap';
import {
  InputWrapper,
  StyledInput,
  ClearInputButton,
  StyledListGroupItem,
  StyledSpinner,
} from './styled';

interface Props {
  props: PropsWithChildren<any>;
  errors: any; //TODO: typing
}

const LocalisationSearchInput = ({ props, errors }: Props) => {
  const { onChange, name, value } = props;

  const handleOnSelect = (
    address: string,
    placeId?: string,
    suggestion?: object,
  ) => {
    geocodeByAddress(address)
      .then(results => onChange(results[0].formatted_address))
      .catch(error => alert(error)); //TODO: handle errors;
  };

  return (
    <PlacesAutocomplete
      value={value !== undefined ? value : ''}
      onChange={onChange}
      onSelect={handleOnSelect}
      searchOptions={{
        componentRestrictions: {
          country: 'pl',
        },
      }}
      debounce={500}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <FormGroup>
          <Label for={name}>Lokalizacja</Label>
          <InputWrapper>
            <StyledInput
              {...getInputProps()}
              name={name}
              placeholder='Np. Warszawa, Lotnisko'
              invalid={errors[name] ? true : false}
              autoFocus={false}
            />
            {value && (
              <ClearInputButton onClick={() => onChange('')}>
                <i className='fa fa-times' aria-hidden='true'></i>
              </ClearInputButton>
            )}
            <FormFeedback>
              <ErrorMessage errors={errors} name={name} />
            </FormFeedback>
          </InputWrapper>
          <ListGroup>
            {!loading &&
              suggestions.map(suggestion => {
                return (
                  <StyledListGroupItem
                    {...getSuggestionItemProps(suggestion)}
                    key={suggestion.index}
                    tag='a'
                    action
                  >
                    {suggestion.description}
                  </StyledListGroupItem>
                );
              })}
          </ListGroup>
          {loading && <StyledSpinner color='primary' />}
        </FormGroup>
      )}
    </PlacesAutocomplete>
  );
};

export default LocalisationSearchInput;
