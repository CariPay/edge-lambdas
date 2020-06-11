IFS='/' read -ra PATHS <<< "$1"
IFS='-' read -ra INITIALS <<< "${PATHS[0]}"
if [[ ${#INITIALS[@]} -eq 2 ]]; then
    echo "${INITIALS[0]}"
else
    echo "cp"
fi