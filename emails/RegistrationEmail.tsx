import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
  Heading,
} from "@react-email/components";
import * as React from "react";

interface RegistrationEmailProps {
  registrationForm: {
    businessName: string;
    fullName: string;
    email: string;
    taxId: string;
    location: string;
  };
  planType: string;
  billingPeriod: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://forkcast.app";

export default function RegistrationEmail({
  registrationForm,
  planType,
  billingPeriod,
}: RegistrationEmailProps) {
  const { businessName, fullName, email } = registrationForm;
  
  const planName = planType === 'starter' 
    ? 'Starter' 
    : planType === 'pro' 
      ? 'Pro' 
      : 'Enterprise';
      
  const periodText = billingPeriod === 'monthly' ? 'mensual' : 'anual';
  
  const price = planType === 'starter' 
    ? 'Gratis' 
    : planType === 'pro' 
      ? billingPeriod === 'monthly' ? '$40/mes' : '$490/año' 
      : 'Personalizado';

  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };

  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    maxWidth: "580px",
  };

  const header = {
    backgroundColor: "#f6f6f6",
    padding: "24px",
    borderRadius: "4px",
  };

  const section = {
    padding: "24px",
    border: "1px solid #f0f0f0",
    borderRadius: "4px",
    marginBottom: "24px",
  };

  const button = {
    backgroundColor: "#d97706",
    borderRadius: "4px",
    color: "#1c1917",
    fontWeight: "600",
    padding: "12px 20px",
  };

  const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
  };

  return (
    <Html>
      <Head />
      <Preview>¡Gracias por comenzar tu prueba gratuita de ForkCast!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://forkcast.app/logo.png"
            width="160"
            height="40"
            alt="ForkCast"
            style={{ marginBottom: "24px" }}
          />
          
          <Section style={header}>
            <Heading as="h1">¡Bienvenido a ForkCast!</Heading>
            <Text>Hola {fullName},</Text>
            <Text>
              Gracias por registrarte en ForkCast. Estamos emocionados de tenerte a bordo y ayudarte a optimizar las compras de tu restaurante.
            </Text>
          </Section>

          <Section style={section}>
            <Heading as="h2">Detalles de tu cuenta</Heading>
            <Text>
              <strong>Plan seleccionado:</strong> {planName} ({periodText})
            </Text>
            <Text>
              <strong>Precio:</strong> {price}
            </Text>
            <Text>
              <strong>Restaurante:</strong> {businessName}
            </Text>
            <Text>
              <strong>Email de acceso:</strong> {email}
            </Text>
            
            <Hr style={hr} />
            
            <Text>
              Para comenzar a utilizar ForkCast, simplemente haz clic en el siguiente botón para establecer tu contraseña:
            </Text>
            
            <Button
              href="https://app.forkcast.app/set-password?email={{email}}&token={{token}}"
              style={button}
            >
              Establecer contraseña
            </Button>
          </Section>
          
          <Section style={section}>
            <Heading as="h2">Próximos pasos</Heading>
            <Text>
              Una vez que accedas a tu cuenta, podrás:
            </Text>
            <ul>
              <li>Configurar tu restaurante y menú</li>
              <li>Conectar con tus proveedores</li>
              <li>Comenzar a realizar compras inteligentes con IA</li>
              <li>Ahorrar tiempo y dinero en tu gestión diaria</li>
            </ul>
          </Section>
          
          <Text>
            Si tienes alguna pregunta, no dudes en responder a este email o contactarnos en ayuda@forkcast.app.
          </Text>
          
          <Text>
            ¡Gracias por elegir ForkCast!
          </Text>
          
          <Hr style={hr} />
          
          <Text style={{ fontSize: "12px", color: "#8898aa" }}>
            Este email fue enviado a {email}. Si no solicitaste esta cuenta, por favor ignora este email o contacta a nuestro equipo de soporte.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
