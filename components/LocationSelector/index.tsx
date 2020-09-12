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

//TODO: handle when location is not selected
const LocationSelector = ({ props, errors }: Props) => {
  const { onChange, name, value } = props;

  const handleOnSelect = (
    address: string,
    placeId?: string,
    suggestion?: object,
  ) => {
    geocodeByAddress(address)
      .then(results => {
        const locality = results[0].address_components.filter(comp =>
          comp.types.includes('locality'),
        );
        console.log(locality);
        onChange(locality[0].long_name);
      })
      .catch(error => alert(error)); //TODO: handle errors;
  };

  return (
    <PlacesAutocomplete
      value={value !== undefined ? value : ''}
      onChange={onChange}
      onSelect={handleOnSelect}
      searchOptions={{
        types: ['(cities)'],
        componentRestrictions: {
          country: 'pl',
        },
      }}
      debounce={500}
      highlightFirstSuggestion={true}
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
              autoFocus={true}
            />
            {value && (
              <ClearInputButton>
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
                    {suggestion.formattedSuggestion.mainText}
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

export default LocationSelector;
