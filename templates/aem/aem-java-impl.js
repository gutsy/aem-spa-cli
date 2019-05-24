module.exports = {
    getJavaImpl(packageName, name, resourceType) {
        return 'package ' + packageName + ';\n' +
            '\n' +
            'import ' + packageName + '.' + name + ';\n' +
            'import com.adobe.cq.export.json.ComponentExporter;\n' +
            'import com.adobe.cq.export.json.ExporterConstants;\n' +
            'import com.day.cq.wcm.api.designer.Style;\n' +
            '\n' +
            'import org.apache.sling.api.SlingHttpServletRequest;\n' +
            'import org.apache.sling.api.resource.ValueMap;\n' +
            'import org.apache.sling.models.annotations.*;\n' +
            'import org.apache.sling.models.annotations.Exporter;\n' +
            'import org.apache.sling.models.annotations.Model;\n' +
            'import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;\n' +
            'import org.slf4j.Logger;\n' +
            'import org.slf4j.LoggerFactory;\n' +
            '\n' +
            '@Model(\n' +
            '    adaptables = SlingHttpServletRequest.class, \n' +
            '    adapters = {' + name + '.class, ComponentExporter.class}, \n' +
            '    resourceType = ' + name + 'Impl.RESOURCE_TYPE,\n' +
            '    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL\n' +
            '    )\n' +
            '@Exporter(\n' +
            '    name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, \n' +
            '    extensions = ExporterConstants.SLING_MODEL_EXTENSION\n' +
            '    )\n' +
            'public class ' + name + 'Impl implements ' + name + ' {\n' +
            '\n' +
            '    static final String RESOURCE_TYPE = ' + resourceType + ';\n' +
            '\n' +
            '//TODO set this label' +
            '    static final String LABEL_SOMETHING   = "your label goes here";\n' +
            '\n' +
            '    private static final Logger log = LoggerFactory.getLogger(' + name + 'Impl.class);\n' +
            '\n' +
            '    @ScriptVariable\n' +
            '    private ValueMap properties;\n' +
            '\n' +
            '    @ScriptVariable\n' +
            '    private Style currentStyle;\n' +
            '\n' +
            '    \n' +
            '\t@Override\n' +
            '\tpublic String getExportedType() {\n' +
            '\t\treturn RESOURCE_TYPE;\n' +
            '    }\n' +
            '\n' +
            '    @Override\n' +
            '    public String getSomething() {\n' +
            '        return properties.get(LABEL_SOMETHING, String.class);\n' +
            '    }\n' +
            '  \n' +
            '}';
    }
};