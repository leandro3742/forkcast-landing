import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface SupplierEmailProps {
  supplierForm: {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    productType: string;
    coverageArea: string;
    message: string;
  };
}

export const SupplierEmail = ({ supplierForm }: SupplierEmailProps) => {
  // Mapeo para los tipos de productos para mostrar nombres legibles
  const productTypeNames: Record<string, string> = {
    'carnes': 'Carnes y embutidos',
    'lacteos': 'Lácteos',
    'verduras': 'Frutas y verduras',
    'bebidas': 'Bebidas',
    'panaderia': 'Panadería y pastelería',
    'condimentos': 'Condimentos y especias',
    'limpieza': 'Productos de limpieza',
    'equipamiento': 'Equipamiento y utensilios',
    'otros': 'Otros'
  };

  // Mapeo para las zonas de cobertura
  const coverageAreaNames: Record<string, string> = {
    'montevideo': 'Montevideo',
    'interior-uy': 'Interior de Uruguay',
    'buenos-aires': 'Buenos Aires',
    'interior-ar': 'Interior de Argentina',
    'ambos': 'Argentina y Uruguay'
  };

  return (
    <Html>
      <Head />
      <Preview>Gracias por tu interés en ForkCast</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://forkcast.app/logo.png"
            width="160"
            height="40"
            alt="ForkCast"
            style={logo}
          />
          <Text style={heading}>¡Gracias por tu interés en ForkCast!</Text>
          <Text style={paragraph}>
            Hola {supplierForm.contactName},
          </Text>
          <Text style={paragraph}>
            Hemos recibido tu solicitud para sumarte como proveedor en ForkCast. Estamos muy contentos de conocer a {supplierForm.companyName} y explorar cómo podemos trabajar juntos.
          </Text>
          <Section style={detailsSection}>
            <Text style={detailsHeading}>Los datos que recibimos son:</Text>
            <Text style={detailsItem}><strong>Empresa:</strong> {supplierForm.companyName}</Text>
            <Text style={detailsItem}><strong>Nombre:</strong> {supplierForm.contactName}</Text>
            <Text style={detailsItem}><strong>Email:</strong> {supplierForm.email}</Text>
            {supplierForm.phone && (
              <Text style={detailsItem}><strong>Teléfono:</strong> {supplierForm.phone}</Text>
            )}
            {supplierForm.productType && (
              <Text style={detailsItem}>
                <strong>Tipo de productos:</strong> {productTypeNames[supplierForm.productType] || supplierForm.productType}
              </Text>
            )}
            {supplierForm.coverageArea && (
              <Text style={detailsItem}>
                <strong>Zona de cobertura:</strong> {coverageAreaNames[supplierForm.coverageArea] || supplierForm.coverageArea}
              </Text>
            )}
          </Section>
          <Text style={paragraph}>
            Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para coordinar una llamada y contarte más sobre cómo funciona nuestra plataforma para proveedores.
          </Text>
          <Button
            href="https://calendly.com/leandro-forkcast"
            style={button}
          >
            Agenda directamente una llamada
          </Button>
          <Hr style={hr} />
          <Text style={footer}>
            © 2025 ForkCast. Todos los derechos reservados.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '32px',
  borderRadius: '8px',
  maxWidth: '600px',
};

const logo = {
  margin: '0 auto',
  display: 'block',
  marginBottom: '32px',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '32px 0',
  color: '#212121',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#4c4c4c',
};

const detailsSection = {
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
};

const detailsHeading = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '12px',
  color: '#212121',
};

const detailsItem = {
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '8px',
  color: '#4c4c4c',
};

const button = {
  backgroundColor: '#F59E0B',
  borderRadius: '4px',
  color: '#111111',
  fontWeight: 'bold',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 16px',
  margin: '32px 0',
};

const hr = {
  borderColor: '#e6e6e6',
  margin: '24px 0',
};

const footer = {
  textAlign: 'center' as const,
  fontSize: '14px',
  color: '#9ca3af',
};

export default SupplierEmail;
