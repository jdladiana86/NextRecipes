'use server';
import { updateTag } from 'next/cache';

export async function refreshRandom() {
  updateTag('random'); // invalidazione immediata del tag
}
