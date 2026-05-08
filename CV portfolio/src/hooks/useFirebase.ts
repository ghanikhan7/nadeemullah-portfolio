import { useState, useEffect } from 'react';
import { doc, onSnapshot, collection, query, getDocs, updateDoc, setDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export interface ProfileData {
  name: string;
  title: string;
  headline: string;
  description: string;
  profileImage: string;
  heroImage: string;
  resumeUrl: string;
  yearsExperience: number;
  majorProjects: number;
  studentsMentored: number;
  rackSolutions: number;
  aboutText1: string;
  aboutText2: string;
  clients: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  description: string;
  image: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const docRef = doc(db, 'profile', 'main');
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data() as ProfileData);
        setError(null);
      } else {
        setError('No profile data found in /profile/main');
      }
      setLoading(false);
    }, (err) => {
      console.error('Error listening to profile:', err);
      setError('Failed to fetch profile data. Please check Firebase permissions.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { profile, loading, error };
};

export const useCertifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const certsCollection = collection(db, 'certifications');
    const q = query(certsCollection);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const certsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Certification[];
      setCertifications(certsData);
      setError(null);
      setLoading(false);
    }, (err) => {
      console.error('Error listening to certifications:', err);
      setError('Failed to fetch certifications. Please check Firebase permissions.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { certifications, loading, error };
};

export const trackPageView = async () => {
  const analyticsRef = doc(db, 'analytics', 'portfolio');
  try {
    await updateDoc(analyticsRef, {
      views: increment(1)
    });
  } catch (error) {
    // If document doesn't exist, create it
    try {
      await setDoc(analyticsRef, { views: 1 });
    } catch (err) {
      console.error('Error tracking page view:', err);
    }
  }
};

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<{ views: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'analytics', 'portfolio');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setAnalytics(docSnap.data() as { views: number });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { analytics, loading };
};

export const useProjectsCount = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'projects'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCount(snapshot.size);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { count, loading };
};
