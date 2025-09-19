import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import SupplierEmail from '@/emails/SupplierEmail';
import { render } from '@react-email/render';

// Inicializar Resend con la API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Admin emails para notificaciones desde variables de entorno o direcciones por defecto
const adminEmailsStr = process.env.ADMIN_EMAILS || '';
const ADMIN_EMAILS = adminEmailsStr.split(',').map(email => email.trim());

// Configuración del remitente
const FROM_NAME = process.env.FROM_NAME || 'ForkCast';
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const FROM = `${FROM_NAME} <${FROM_EMAIL}>`

// Mapeo para tipos de productos para mostrar nombres legibles
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

// Mapeo para zonas de cobertura
const coverageAreaNames: Record<string, string> = {
  'montevideo': 'Montevideo',
  'interior-uy': 'Interior de Uruguay',
  'buenos-aires': 'Buenos Aires',
  'interior-ar': 'Interior de Argentina',
  'ambos': 'Argentina y Uruguay'
};

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { 
      companyName, 
      contactName, 
      email, 
      phone, 
      productType, 
      coverageArea, 
      message 
    } = formData;

    // Validación básica
    if (!companyName || !contactName || !email) {
      return NextResponse.json(
        { error: 'Nombre de empresa, nombre de contacto y email son requeridos' },
        { status: 400 }
      );
    }

    if (!resend) {
      throw new Error('API key de Resend no configurada');
    }

    // Array para almacenar resultados de envíos
    const emailResults = [];

    // 1. Enviar email al proveedor usando el componente React directamente
    try {
      const providerEmailResult = await resend.emails.send({
        from: FROM,
        to: [email],
        subject: 'Gracias por tu interés en ForkCast',
        react: SupplierEmail({ supplierForm: formData }),
      });
      
      emailResults.push({ to: 'provider', result: providerEmailResult });
    } catch (providerEmailError) {
      console.error('Error al enviar email al proveedor:', providerEmailError);
      emailResults.push({ to: 'provider', error: providerEmailError });
    }
    
    // 2. Enviar notificación a los administradores
    try {
      const productTypeName = productType ? (productTypeNames[productType] || productType) : 'No especificado';
      const coverageAreaName = coverageArea ? (coverageAreaNames[coverageArea] || coverageArea) : 'No especificada';
      const adminEmailResult = await resend.emails.send({
        from: FROM,
        to: ['leandro@forkcast.tech'],
        subject: `Nuevo proveedor interesado: ${companyName}`,
        html: `
          <h2>Nuevo proveedor interesado en ForkCast</h2>
          <p><strong>Empresa:</strong> ${companyName}</p>
          <p><strong>Nombre de contacto:</strong> ${contactName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
          <p><strong>Tipo de productos:</strong> ${productTypeName}</p>
          <p><strong>Zona de cobertura:</strong> ${coverageAreaName}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message || 'Sin mensaje'}</p>
        `,
      });
      emailResults.push({ to: 'admin', result: adminEmailResult });
    } catch (adminEmailError) {
      console.error('Error al enviar email a los administradores:', adminEmailError);
      emailResults.push({ to: 'admin', error: adminEmailError });
    }

    // Si al menos un email se envió correctamente, consideramos éxito parcial
    const successCount = emailResults.filter(r => !r.error).length;
    const status = successCount > 0 ? 200 : 500;
    
    return NextResponse.json({ 
      success: successCount > 0,
      emailResults,
      message: successCount > 0 
        ? `Se enviaron ${successCount} de ${emailResults.length} emails correctamente` 
        : 'No se pudo enviar ningún email'
    }, { status });
    
  } catch (error) {
    console.error('Error general al procesar la solicitud:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud', details: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}
