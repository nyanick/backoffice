import jwtDecode from "jwt-decode";

export const verifyToken = (token: string) => {
    const data = jwtDecode(token) as any
    const expiryTime = new Date(data.exp * 1000).getTime()
    const currentTime = new Date().getTime()

    return expiryTime >= currentTime + 3000
}

export const AUTHORIZED_FILES_TYPES = Array.of('image/jpeg', 'image/jpg', 'image/png', 'application/pdf');
const MAX_FILE_SIZE_LIMIT = 2 * 1024 * 1024;

const isFileTooLarge = (chosenFile) => {
    return chosenFile.size > MAX_FILE_SIZE_LIMIT
};

export const fileValidator = (file, required?, avatar?) => {
    if (file) {
        if (AUTHORIZED_FILES_TYPES.includes(file.type)) {
            if (avatar) {
                if (file.type !== 'application/pdf') {
                    if (isFileTooLarge(file)) {
                        return "fichier volumineux";
                    }
                } else {
                    return "type d'image non suppporté";
                }
            } else {
                if (isFileTooLarge(file)) {
                    return "fichier volumineux";
                }
            }
        } else {
            return "type de fichier non supporté";
        }
    } else {
        if (required) return "Champs requis";
    }
}

export const extractPageTitle = (url: string) => {
    // Home
    if(url === "" || url === "/") {
        return "Administration Nucleus :: Accueil"
    }

    // Admins
    if (/^admins$/.test(url.split("/")[1])) {
        if (/^\/admins\/add$/.test(url))
            return "Nouvel administrateur"

        if (/^\/admins\/([a-z0-9]+)$/.test(url))
            return "Détails de l'administrateur"

        if (/^\/admins\/([a-z0-9]+)\/edit$/.test(url))
            return "Mettre à jour l'administrateur"
        return "Administrateurs"
    }

    // Doctors
    if (/^doctors$/.test(url.split("/")[1])) {
        if (/^\/doctors\/add$/.test(url))
            return "Nouveau Médecin"

        if (/^\/doctors\/([a-z0-9]+)$/.test(url))
            return "Détails du médecin"

        if (/^\/doctors\/([a-z0-9]+)\/edit$/.test(url))
            return "Mettre à jour le médecin"
        return "Médecins"
    }

    // Patients
    if (/^patients$/.test(url.split("/")[1])) {
        if (/^\/patients\/add$/.test(url))
            return "Nouveau Patient"

        if (/^\/patients\/([a-z0-9]+)$/.test(url))
            return "Détails du patient"

        if (/^\/patients\/([a-z0-9]+)\/edit$/.test(url))
            return "Mettre à jour le patient"
        return "Patients"
    }

    // Specialties
    if (/^specialties$/.test(url.split("/")[1])) {
        if (/^\/specialties\/add$/.test(url))
            return "Nouvelle Spécialité"

        if (/^\/specialties\/([a-z0-9]+)\/edit$/.test(url))
            return "Mettre à jour la spécialité"
        return "Spécialités"
    }

    // Symptoms
    if (/^symptoms$/.test(url.split("/")[1])) {
        if (/^\/symptoms\/add$/.test(url))
            return "Nouveau Symptôme"

        if (/^\/symptoms\/([a-z0-9]+)\/edit$/.test(url))
            return "Mettre à jour le symptôme"
        return "Symptômes"
    }

    // Groups
    if (/^groups$/.test(url.split("/")[1])) {
        if (/^\/groups\/add$/.test(url))
            return "Nouveau Groupe"

        if (/^\/groups\/([a-z0-9]+)\/edit$/.test(url))
            return "Mettre à jour le groupe"
        return "Groupes"
    }

    // Categories
    if (/^categories$/.test(url.split("/")[1])) {
        if (/^\/categories\/add$/.test(url))
            return "Nouvelle Catégorie"

        if (/^\/categories\/([a-z0-9]+)\/edit$/.test(url))
            return "Mettre à jour la catégorie"
        return "Catégories"
    }

    // Exams
    if (/^exams$/.test(url.split("/")[1])) {
        if (/^\/exams\/add$/.test(url))
            return "Nouvel Examen"

        if (/^\/exams\/([a-z0-9]+)\/edit$/.test(url))
            return "Mettre à jour l'examen"
        return "Examens"
    }

    // Users
    if (/^users$/.test(url.split("/")[1])) {
        if (/^\/users\/([a-z0-9]+)$/.test(url))
            return "Détails de l'utilisateur"

        if (/^\/users\/([a-z0-9]+)\/edit$/.test(url))
            return "Mettre à jour l'utilisateur"
        return "Utilisateurs"
    }

    // Analysts
    if (/^analysts$/.test(url.split("/")[1])) {
        if (/^\/analysts\/add$/.test(url))
            return "Nouveau Laborantin"

        if (/^\/analysts\/([a-z0-9]+)$/.test(url))
            return "Détails du laborantin"

        if (/^\/analysts\/([a-z0-9]+)\/edit$/.test(url))
            return "Mettre à jour le laborantin"
        return "Laborantins"
    }

    // Nurses
    if (/^nurses$/.test(url.split("/")[1])) {
        if (/^\/nurses\/add$/.test(url))
            return "Nouvel Infirmier"

        if (/^\/nurses\/([a-z0-9]+)$/.test(url))
            return "Détails de l'infirmier"

        if (/^\/nurses\/([a-z0-9]+)\/edit$/.test(url))
            return "Mettre à jour l'infirmier"
        return "Infirmiers"
    }

    // Hospitals
    if (/^hospitals$/.test(url.split("/")[1])) {
        if (/^\/hospitals\/add$/.test(url))
            return "Nouvel Hôpital"

        if (/^\/hospitals\/([a-z0-9]+)$/.test(url))
            return "Détails de l'hôpital"

        if (/^\/hospitals\/([a-z0-9]+)\/edit$/.test(url))
            return "Mettre à jour l'hôpital"
        return "Hopitaux"
    }

    return "Page non trouvée"
}