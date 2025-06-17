"use server";


export async function loginGoogle() {
  try {
    await fetch("http://backend:8000/auth/google/redirect")
    
  } catch (err) {
    return {
        success: false,
        error: err instanceof Error ? err.message : "Hubo un problema al registrar la cuenta"
    }
  }
}
