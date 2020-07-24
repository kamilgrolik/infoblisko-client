import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { EntryForm } from './EntryForm';

export const Wall = () => (
  <Container>
    <Row>
      <Col xs={12}>
        <EntryForm />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>entry</Col>
    </Row>
  </Container>
);
