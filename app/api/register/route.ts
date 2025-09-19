import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import RegistrationEmail from '@/emails/RegistrationEmail';
import { render } from '@react-email/render';

// Inicializar Resend con la API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email de administradores para notificaciones
const ADMIN_EMAILS = ['leandro@forkcast.tech', 'agustina@forkcast.tech'];

// Configuración del remitente
const FROM_NAME = process.env.FROM_NAME || 'ForkCast';
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const FROM = `${FROM_NAME} <${FROM_EMAIL}>`

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { 
      businessName, 
      fullName, 
      email, 
      taxId, 
      location,
      planType,
      billingPeriod
    } = formData;

    // Validación básica
    if (!businessName || !fullName || !email) {
      return NextResponse.json(
        { error: 'Nombre de empresa, nombre completo y email son requeridos' },
        { status: 400 }
      );
    }

    if (!resend) {
      throw new Error('API key de Resend no configurada');
    }

    // Array para almacenar resultados de envíos
    const emailResults = [];

    // 1. Enviar email al usuario registrado usando el componente React
    try {
      const userEmailResult = await resend.emails.send({
        from: FROM,
        to: [email],
        subject: `¡Bienvenido a ForkCast ${fullName}!`,
        react: RegistrationEmail({ 
          registrationForm: { businessName, fullName, email, taxId, location },
          planType,
          billingPeriod
        }),
      });
      
      emailResults.push({ to: 'user', result: userEmailResult });
    } catch (userEmailError) {
      console.error('Error al enviar email al usuario:', userEmailError);
      emailResults.push({ to: 'user', error: userEmailError });
    }
    
    // 2. Enviar notificación a los administradores
    try {
      // Mensaje HTML para los administradores
      const adminEmailHtml = `
        <h2>Nuevo registro en ForkCast</h2>
        <p><strong>Empresa:</strong> ${businessName}</p>
        <p><strong>Nombre completo:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>RUT/CUIT:</strong> ${taxId || 'No proporcionado'}</p>
        <p><strong>Ubicación:</strong> ${location || 'No especificada'}</p>
        <p><strong>Plan seleccionado:</strong> ${planType}</p>
        <p><strong>Periodo de facturación:</strong> ${billingPeriod}</p>
      `;

      // Enviar a cada administrador individualmente
      for (const adminEmail of ADMIN_EMAILS) {
        try {
          const adminEmailResult = await resend.emails.send({
            from: FROM,
            to: [adminEmail],
            subject: `Nuevo registro: ${businessName} - Plan ${planType}`,
            html: adminEmailHtml,
          });
          
          emailResults.push({ to: `admin-${adminEmail}`, result: adminEmailResult });
        } catch (individualAdminError) {
          console.error(`Error al enviar email a ${adminEmail}:`, individualAdminError);
          emailResults.push({ to: `admin-${adminEmail}`, error: individualAdminError });
        }
      }
    } catch (adminEmailError) {
      console.error('Error general al enviar emails a los administradores:', adminEmailError);
      emailResults.push({ to: 'admin-general', error: adminEmailError });
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
