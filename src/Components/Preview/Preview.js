import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import './Preview.css';
import './Markdown.css';

class Preview extends Component {
content = `# 🆘 Problèmes majeur

\`\`\`
[ ] Télécharger un dossier ne vérifie pas les permissons
[x] Restrictions d'url bancale. Voir \`💡 Idées d'amélioration\`
[x] Textarea de text-plain caché après l'ouverture un fichier .md/html en mode preview
[x] Interdire l'utilisation des caractères :   / : * ? " < > | 
[x] L'utilisation du caractère "&" dans les noms de fichiers et dossiers provoque une erreur lors de la suppression/zip 
[x] L'utilisation du caractère "&" dans les noms de fichiers et dossiers provoque une erreur lors du téléchargement
[x] La page d'enregistrement ne fonctionne plus
\`\`\`

<blockquote>Hello form quote</blockquote>

# ⚠️ Problèmes mineur

\`\`\`
[ ] Accents et téléchargement ne font pas bon ménage
[ ] Redimensionnement de fenêtre avec un document en prévisualisation
[ ] Page de profil avec option de modification des différents champs
[ ] Page de récupération de mot de passe
[x] Ajout d'espace entre les colonnes des tableau en markdown
[x] L'option "Remember me" de la page de login n'est plus présente
[x] La page de confirmation d'inscription est super laide
\`\`\`

# 💡 Idées d'amélioration

\`\`\`
[ ] La modification de l'url change le path
[ ] Ajout de la double prévisualisation (possibilité de séparer en deux pour ouvrir deux documents en même temps)
[x] Affichage de preview multi onglets
[x] Nouvelle approche de la restriction d'url avec l'utilisation de fichiers aux emplacements restreint décrivant les autorisations.
[x] Refonte CSS de la liste des fichiers : exemple de la liste de téléchargement de Chrome
[x] Mobile : retirer les marges du conteneur (@media only screen and (max-device-width: 480px) { .class{} .class{} })
[x] Preview markdown uniquement pour les fichier .md / .html
[x] Fichier text standrad : Pas de preview, edition uniquement
[x] Ajout de la page "Contact"
[x] Ajout de la page "About"
[x] css police md preview : font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
[x] css police md edition : font-family: Consolas,"Liberation Mono",Menlo,Courier,monospace; font-size: 12px;
[x] Ne pas demander de sauvegarder un fichier a un utilisateur qui n'ai pas été dans le mode édition
[x] Ajout d'un champ "default_path" dans l'entité utilisateur pour restreindre l'accès des fichiers 
[x] Ctrl + S pour sauvegarder un fichier
[x] TAB pour insérer une tabulation (au lieu de changer de conteneur)
[x] Appuis sur entrer valide le formulaire de création/renommage de fichier/dossier
[x] Ajout d'un moyen de prévenir l'utilisateur de l'état d'une opération (exemple sauvegarde, succès ? échec ?)
[x] Ajout de la sauvegarde de fichier sans rechargement de la page (méthode AJAX)
[x] Proposer à l'utilisateur de sauvegarder avant de quitter l'aperçu d'un fichier ~~Prévenir l'utilisateur qu'il risque de perdre des données~~
[x] Pouvoir passer le mode en preview en plein écran
\`\`\`
`;

    handleTabClick = (file, index) => {
        this.props.preview.selectedFile = index;
        this.setState({});
    }

    handleCloseTabClick = (index) => {
        var encoded_arr = window.location.hash === "" ? "[]" : window.location.hash;
        var decoded_arr = decodeURIComponent(encoded_arr).replace('#','');
        var arr = JSON.parse(decoded_arr);
        arr.splice(index, 1);
        window.location.hash = encodeURIComponent(JSON.stringify(arr));

        if(this.state.activePanel >= arr.length) {
            this.setState({activePanel : arr.length-1});
        }
    }

    render() {
        return (
            <div className="cloud_preview">
                <div className="cloud_preview_tabsbar" role="tablist">
                    {this.props.preview.files.map((item, index) => (
                        <div key={item.url} className="cloud_preview_tabsbar_item" aria-selected={index === this.props.preview.selectedFile}>
                            <button role="tab" className="cloud_preview_tabsbar_item_name" id={"preview-" + index} onClick={() => this.handleTabClick(item, index)} title={item.url}> {item.name} </button>
                            <button className="cloud_preview_tabsbar_item_close_btn material-icons" onClick={() => this.props.onCloseTab(item.url)}>close</button>
                        </div>
                    ))}
                </div>

                <div className="cloud_preview_panel">
                    {this.props.preview.files.map((item, index) => (
                        <div key={item.url} role="tabpanel" className="cloud_preview_panel_item" aria-labelledby={"preview-" + index} hidden={index !== this.props.preview.selectedFile} /*dangerouslySetInnerHTML={{__html: item.isLoaded ? item.content : 'Loading content, please wait...'}}*/>
                            {
                                <ReactMarkdown source={item.isLoaded ? item.content : 'Loading content, please wait...'} skipHtml={false} escapeHtml={false} className="modal-markdown-textpreview"/>
                            }
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Preview;