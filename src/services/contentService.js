import { supabase, SUPABASE_URL } from './supabaseClient';

export const contentService = {
  // Generic Fetch All
  async getAll(table, orderColumn = 'sort_order', ascending = true) {
    try {
      let query = supabase.from(table).select('*');
      if (orderColumn) {
        query = query.order(orderColumn, { ascending, nullsFirst: false });
      }
      const { data, error } = await query;
      if (error) throw error;

      // For management_team, seamlessly attach images from site_settings image mapping if not in columns
      if (table === 'management_team') {
        try {
          const { data: imgSetting } = await supabase
            .from('site_settings')
            .select('value')
            .eq('id', 'management_images')
            .maybeSingle();
          const imagesMap = imgSetting?.value || {};
          const merged = (data || []).map(item => ({
            ...item,
            image: item.image || imagesMap[item.id] || ''
          }));
          return { success: true, data: merged };
        } catch (mgtErr) {
          console.warn('Error reading management_images setting:', mgtErr);
        }
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.warn(`contentService.getAll(${table}) warning:`, error.message);
      return { success: false, error: error.message, data: null };
    }
  },

  // Generic Create
  async create(table, payload) {
    try {
      // Remove undefined or null id so postgres generates it
      const cleanPayload = { ...payload };
      if (!cleanPayload.id) delete cleanPayload.id;

      let { data, error } = await supabase
        .from(table)
        .insert([cleanPayload])
        .select();

      // Retry without unrecognized column if schema mismatch occurs
      let retries = 0;
      while (error && error.message && error.message.includes('in the schema cache') && retries < 3) {
        const match = error.message.match(/Could not find the '([^']+)' column/);
        if (match && match[1]) {
          delete cleanPayload[match[1]];
          const retryRes = await supabase
            .from(table)
            .insert([cleanPayload])
            .select();
          data = retryRes.data;
          error = retryRes.error;
          retries++;
        } else {
          break;
        }
      }

      if (error) throw error;

      // If management_team, persist image to management_images map
      if (table === 'management_team' && payload.image !== undefined) {
        const createdId = data?.[0]?.id || data?.id;
        if (createdId) {
          try {
            const { data: imgSetting } = await supabase
              .from('site_settings')
              .select('value')
              .eq('id', 'management_images')
              .maybeSingle();
            const imagesMap = imgSetting?.value || {};
            imagesMap[createdId] = payload.image;
            await supabase
              .from('site_settings')
              .upsert([{ id: 'management_images', value: imagesMap, updated_at: new Date().toISOString() }]);
          } catch (imgErr) {
            console.warn('Failed to save management image in site_settings:', imgErr);
          }
        }
      }

      return { success: true, data: data?.[0] || data };
    } catch (error) {
      console.error(`contentService.create(${table}) error:`, error);
      return { success: false, error: error.message };
    }
  },

  // Generic Batch Create
  async createMany(table, payloadArray) {
    try {
      if (!Array.isArray(payloadArray) || payloadArray.length === 0) {
        return { success: true, data: [] };
      }
      const cleanPayloads = payloadArray.map(item => {
        const c = { ...item };
        if (!c.id) delete c.id;
        return c;
      });

      const { data, error } = await supabase
        .from(table)
        .insert(cleanPayloads)
        .select();

      if (error) throw error;
      return { success: true, data: data || [] };
    } catch (error) {
      console.error(`contentService.createMany(${table}) error:`, error);
      return { success: false, error: error.message };
    }
  },

  // Generic Update
  async update(table, id, updates) {
    try {
      const cleanUpdates = { ...updates };
      // Only include updated_at if the table schema defines it or if explicitly provided
      if (['site_settings', 'hero_banners', 'leadership_messages'].includes(table) || updates.updated_at) {
        cleanUpdates.updated_at = new Date().toISOString();
      } else {
        delete cleanUpdates.updated_at;
      }
      // Don't update primary key id itself
      delete cleanUpdates.id;

      let { data, error } = await supabase
        .from(table)
        .update(cleanUpdates)
        .eq('id', id)
        .select();

      // Retry if schema mismatch or missing column occurs
      let retries = 0;
      while (error && error.message && (error.message.includes('in the schema cache') || error.message.includes('updated_at')) && retries < 3) {
        if (error.message.includes('updated_at')) {
          delete cleanUpdates.updated_at;
        }
        const match = error.message.match(/Could not find the '([^']+)' column/);
        if (match && match[1]) {
          delete cleanUpdates[match[1]];
        }
        const retry = await supabase
          .from(table)
          .update(cleanUpdates)
          .eq('id', id)
          .select();
        data = retry.data;
        error = retry.error;
        retries++;
      }

      if (error) throw error;

      // If management_team, persist image to management_images map
      if (table === 'management_team' && updates.image !== undefined) {
        try {
          const { data: imgSetting } = await supabase
            .from('site_settings')
            .select('value')
            .eq('id', 'management_images')
            .maybeSingle();
          const imagesMap = imgSetting?.value || {};
          imagesMap[id] = updates.image;
          await supabase
            .from('site_settings')
            .upsert([{ id: 'management_images', value: imagesMap, updated_at: new Date().toISOString() }]);
        } catch (imgErr) {
          console.warn('Failed to update management image in site_settings:', imgErr);
        }
      }

      return { success: true, data: data?.[0] || data };
    } catch (error) {
      console.error(`contentService.update(${table}, ${id}) error:`, error);
      return { success: false, error: error.message };
    }
  },

  // Generic Upsert
  async upsert(table, payload) {
    try {
      const cleanPayload = { ...payload };
      if (['site_settings', 'hero_banners', 'leadership_messages'].includes(table) || payload.updated_at) {
        cleanPayload.updated_at = new Date().toISOString();
      } else {
        delete cleanPayload.updated_at;
      }

      let { data, error } = await supabase
        .from(table)
        .upsert([cleanPayload])
        .select();

      let retries = 0;
      while (error && error.message && (error.message.includes('in the schema cache') || error.message.includes('updated_at')) && retries < 3) {
        if (error.message.includes('updated_at')) {
          delete cleanPayload.updated_at;
        }
        const match = error.message.match(/Could not find the '([^']+)' column/);
        if (match && match[1]) {
          delete cleanPayload[match[1]];
        }
        const retry = await supabase
          .from(table)
          .upsert([cleanPayload])
          .select();
        data = retry.data;
        error = retry.error;
        retries++;
      }

      if (error) throw error;
      return { success: true, data: data?.[0] || data };
    } catch (error) {
      console.error(`contentService.upsert(${table}) error:`, error);
      return { success: false, error: error.message };
    }
  },

  // Generic Delete
  async remove(table, id) {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) {
        // If the ID is not a valid UUID (e.g. a mock number or local id), it doesn't exist in Supabase
        if (error.code === '22P02' || (error.message && error.message.includes('invalid input syntax for type uuid'))) {
          console.warn(`contentService.remove(${table}, ${id}): Non-UUID id treated as local removal.`);
          return { success: true, localOnly: true };
        }
        throw error;
      }

      // If management_team, clean up image from management_images map
      if (table === 'management_team') {
        try {
          const { data: imgSetting } = await supabase
            .from('site_settings')
            .select('value')
            .eq('id', 'management_images')
            .maybeSingle();
          if (imgSetting?.value && imgSetting.value[id]) {
            const imagesMap = { ...imgSetting.value };
            delete imagesMap[id];
            await supabase
              .from('site_settings')
              .upsert([{ id: 'management_images', value: imagesMap, updated_at: new Date().toISOString() }]);
          }
        } catch (imgErr) {
          console.warn('Failed to clean up management image from site_settings:', imgErr);
        }
      }

      return { success: true };
    } catch (error) {
      console.error(`contentService.remove(${table}, ${id}) error:`, error);
      return { success: false, error: error.message };
    }
  },

  // Generic Batch Reorder
  async reorder(table, orderedItems) {
    try {
      // orderedItems is an array: [{ id, sort_order }, ...]
      const updates = orderedItems.filter(item => item && item.id);
      const promises = updates.map(item =>
        supabase
          .from(table)
          .update({ sort_order: item.sort_order })
          .eq('id', item.id)
      );

      const results = await Promise.all(promises);
      const errorResult = results.find(r => r && r.error);
      if (errorResult && errorResult.error) throw errorResult.error;

      return { success: true };
    } catch (error) {
      console.error(`contentService.reorder(${table}) error:`, error);
      return { success: false, error: error.message };
    }
  },

  // Specific: Hero Banner
  async getHeroBanner() {
    try {
      const { data, error } = await supabase
        .from('hero_banners')
        .select('*')
        .limit(1);

      if (error) throw error;
      return { success: true, data: data?.[0] || null };
    } catch (error) {
      return { success: false, error: error.message, data: null };
    }
  },

  async updateHeroBanner(id, updates) {
    if (!id) {
      const { data } = await supabase.from('hero_banners').select('id').limit(1);
      if (data && data.length > 0) {
        return this.update('hero_banners', data[0].id, updates);
      }
      return this.create('hero_banners', updates);
    }
    return this.update('hero_banners', id, updates);
  },

  // Specific: Site Settings
  async getSiteSettings(key = 'general') {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('id', key);

      if (error) throw error;
      return { success: true, data: data?.[0]?.value || null };
    } catch (error) {
      return { success: false, error: error.message, data: null };
    }
  },

  async updateSiteSettings(key = 'general', value) {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .upsert([{ id: key, value, updated_at: new Date().toISOString() }])
        .select();

      if (error) throw error;
      return { success: true, data: data?.[0] || data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Contact Form Submission (Public callable)
  async submitContactQuery(submission) {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: submission.name,
          email: submission.email,
          phone: submission.phone || '',
          subject: submission.subject || 'General Inquiry',
          message: submission.message,
          status: 'Unread'
        }])
        .select();

      if (error) throw error;
      return { success: true, data: data?.[0] || data };
    } catch (error) {
      console.error('Contact submission error:', error);
      return { success: false, error: error.message };
    }
  },

  // Storage Media Upload
  async uploadMedia(file, folder = 'uploads') {
    try {
      if (!file) throw new Error('No file provided');
      
      const fileExt = file.name.split('.').pop();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 20);
      const fileName = `${folder}/${Date.now()}_${sanitizedName}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      // Get public URL
      const { data: publicData } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      return {
        success: true,
        url: publicData.publicUrl,
        path: data?.path || fileName
      };
    } catch (error) {
      console.error('uploadMedia error:', error);
      return { success: false, error: error.message };
    }
  }
};
