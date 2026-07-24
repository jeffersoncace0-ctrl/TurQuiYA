// =====================================================
// api.js — Cliente Supabase para TurquiYA
// =====================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://oznhwcpbwivngxinrsbx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96bmh3Y3Bid2l2bmd4aW5yc2J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3MTU1MjAsImV4cCI6MjA5OTI5MTUyMH0.myeE6w88gMFNSxa-iZpMwx8GmpKTrXPcOVpZq9_VD_k';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function obtenerDestinos() {
    const { data, error } = await supabase.from('destinos').select('*');
    if (error) throw new Error(error.message);
    return data;
}

export async function obtenerDestino(id) {
    const { data, error } = await supabase.from('destinos').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return data;
}

export async function registrarUsuario(email, password, metadata) {
    const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { data: metadata }
    });
    if (error) throw new Error(error.message);
    return data;
}

export async function iniciarSesion(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return data;
}

export async function cerrarSesion() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export async function obtenerUsuarioActual() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export async function obtenerPerfilUsuario() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data, error } = await supabase.from('perfiles').select('*').eq('id', user.id).single();
    if (error) throw new Error(error.message);
    return data;
}